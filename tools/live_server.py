"""Tiny live-reload server for a static site (no dependencies).

    python3 -I live_server.py <site-folder> [port]

- Serves the folder at http://127.0.0.1:<port>/ with caching turned off.
- Watches every file; when one changes, open pages update by themselves:
  a .css change swaps the stylesheet in place, anything else reloads the page.
- Reloads keep the reader's scroll position (important on a 17-million-pixel page).
"""
import functools
import http.server
import os
import sys
import threading
import time

ROOT = os.path.abspath(sys.argv[1])
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8000

SNIPPET = b"""
<script>
(function () {
  var KEY = 'live-reload-scroll:' + location.pathname;
  try {
    var saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (saved) {
      sessionStorage.removeItem(KEY);
      var restore = function () { window.scrollTo(saved[0], saved[1]); };
      window.addEventListener('load', function () { restore(); setTimeout(restore, 300); });
    }
  } catch (e) {}
  var source = new EventSource('/__live');
  source.onmessage = function (event) {
    if (event.data === 'css') {
      document.querySelectorAll('link[rel=stylesheet]').forEach(function (link) {
        var url = new URL(link.href);
        url.searchParams.set('live', Date.now());
        link.href = url.toString();
      });
      return;
    }
    try { sessionStorage.setItem(KEY, JSON.stringify([window.scrollX, window.scrollY])); } catch (e) {}
    location.reload();
  };
})();
</script>
"""

state = {"version": 0, "kind": "reload"}
changed = threading.Condition()


def snapshot():
    files = {}
    for folder, dirs, names in os.walk(ROOT):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for name in names:
            path = os.path.join(folder, name)
            try:
                files[path] = os.stat(path).st_mtime_ns
            except OSError:
                pass
    return files


def watch():
    before = snapshot()
    while True:
        time.sleep(0.4)
        after = snapshot()
        diff = [p for p in set(before) | set(after) if before.get(p) != after.get(p)]
        if diff:
            kind = "css" if all(p.endswith(".css") for p in diff) else "reload"
            for p in diff:
                print("changed:", os.path.relpath(p, ROOT), "->", kind, flush=True)
            with changed:
                state["version"] += 1
                state["kind"] = kind
                changed.notify_all()
        before = after


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *args):
        pass

    def do_GET(self):
        if self.path == "/__live":
            return self.stream_events()
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            path = os.path.join(path, "index.html")
        if path.endswith(".html") and os.path.isfile(path):
            with open(path, "rb") as f:
                body = f.read()
            if b"</body>" in body:
                body = body.replace(b"</body>", SNIPPET + b"</body>", 1)
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def stream_events(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.end_headers()
        seen = state["version"]
        try:
            while True:
                with changed:
                    changed.wait(timeout=15)
                    version, kind = state["version"], state["kind"]
                if version != seen:
                    seen = version
                    self.wfile.write(f"data: {kind}\n\n".encode())
                else:
                    self.wfile.write(b": ping\n\n")
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError):
            pass


if __name__ == "__main__":
    threading.Thread(target=watch, daemon=True).start()
    server = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Handler, directory=ROOT))
    server.daemon_threads = True
    print(f"Serving {ROOT} at http://127.0.0.1:{PORT}/ (live reload on)", flush=True)
    server.serve_forever()
