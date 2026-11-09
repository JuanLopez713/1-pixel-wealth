#!/bin/sh
# Click "Next" through every stop in headless Chrome and list any text or
# graphic that never comes fully on screen. Usage: tools/walk_test.sh [width]
# (headless Chrome can't go below 500 px wide).
cd "$(dirname "$0")/.." || exit 1
W=${1:-1400}
python3 -I - index.html tools/walk.js _walk.html <<'PY'
import sys
h = open(sys.argv[1]).read(); js = open(sys.argv[2]).read()
pre = '<script>const _st=window.scrollTo.bind(window);window.scrollTo=(a,b)=>typeof a==="object"?_st(Object.assign({},a,{behavior:"instant"})):_st(a,b);</script>'
h = h.replace('<script type="text/javascript" src="main.js', pre + '<script type="text/javascript" src="main.js')
open(sys.argv[3], "w").write(h.replace("</body>", "<script>" + js + "</script></body>"))
PY
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --window-size="$W",900 --virtual-time-budget=150000 --dump-dom "file://$PWD/_walk.html" 2>/dev/null \
  | grep -o 'data-log="[^"]*"' | sed 's/&quot;/"/g; s/&amp;/\&/g; s/","/\n  - /g'
rm -f _walk.html
