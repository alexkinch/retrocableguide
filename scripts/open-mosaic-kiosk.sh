#!/bin/zsh
set -euo pipefail

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --kiosk \
  --window-size=720,576 \
  --autoplay-policy=no-user-gesture-required \
  --disable-pinch \
  --overscroll-history-navigation=0 \
  http://127.0.0.1:5173/mosaic
