#!/bin/bash
# Muse City 33 — 一鍵開啟本地測試
# 用法：雙擊或在終端執行 bash start.sh
set -e
cd "$(dirname "$0")"
echo "▶ Muse City 33 啟動中..."

# 若 vite 未安裝，自動安裝（使用 /tmp 快取避開權限問題）
if [ ! -f "node_modules/.bin/vite" ]; then
  echo "  安裝依賴..."
  npm --cache /tmp/npm-cache install --silent
fi

# 建置
echo "  建置中..."
./node_modules/.bin/vite build --silent 2>&1 | tail -n 5

# 開啟瀏覽器（在沙盒外執行才有效）
echo "  開啟瀏覽器..."
if command -v open >/dev/null 2>&1; then
  # macOS
  open "index.html" 2>/dev/null || open "dist/index.html"
  echo "✓ 已呼叫 open，請查看瀏覽器"
else
  # Linux
  xdg-open "index.html" 2>/dev/null || echo "請手動開啟 index.html"
fi

echo ""
echo "  若需開發伺服器（熱重載）："
echo "  npm --cache /tmp/npm-cache run dev"
echo "  然後開啟 http://localhost:5173"
