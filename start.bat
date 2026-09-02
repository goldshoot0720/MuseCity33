@echo off
REM Muse City 33 — Windows 一鍵開啟
REM 用法：雙擊 start.bat
cd /d "%~dp0"
echo ▶ Muse City 33 啟動中...

if not exist "node_modules\.bin\vite.cmd" (
  echo   安裝依賴...
  call npm install
)

echo   建置中...
call npx vite build

echo   開啟瀏覽器...
start "" "index.html"
if errorlevel 1 start "" "dist\index.html"

echo.
echo   若需開發伺服器：
echo   npm run dev
echo   然後開啟 http://localhost:5173
pause
