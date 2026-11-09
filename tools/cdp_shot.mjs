// Drive headless Chrome over the DevTools protocol: load a page, run setup JS
// (e.g. clicking Next), then screenshot the viewport where it ended up.
// usage: node cdp_shot.mjs <url> <out.png> <width> <height> "<setup js>"
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, width = "1300", height = "760", setup = ""] = process.argv.slice(2);
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "cdp-"))}`, `--window-size=${width},${height}`, "about:blank",
], { stdio: "ignore" });
const sleep = ms => new Promise(r => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      target = list.find(t => t.type === "page");
    } catch {}
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", e => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  });
  const send = (method, params = {}) => new Promise(r => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: +width, height: +height, deviceScaleFactor: 1, mobile: +width <= 450 });
  await send("Page.navigate", { url });
  await sleep(2500);
  if (setup) {
    const r = await send("Runtime.evaluate", { expression: `(async () => { ${setup} })()`, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) console.error("setup error:", JSON.stringify(r.result.exceptionDetails).slice(0, 300));
    else if (r.result?.result?.value !== undefined) console.log(JSON.stringify(r.result.result.value));
  }
  await sleep(800);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  ws.close();
} finally {
  chrome.kill();
}
