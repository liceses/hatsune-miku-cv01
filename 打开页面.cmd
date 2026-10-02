@echo off
chcp 65001 >nul
setlocal
set MIKU_PORT=8899
set "HERE=%~dp0"

set "NODE="
where node >nul 2>nul && set "NODE=node"
if not defined NODE if exist "%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe" set "NODE=%USERPROFILE%\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"
if not defined NODE if exist "%APPDATA%\..\..\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe" set "NODE=%APPDATA%\..\..\.dsh\dsh-runtimes\dsh-primary-runtime\dependencies\node\bin\node.exe"

if not defined NODE (
  echo [MIKU] node not found - opening index.html directly.
  start "" "%HERE%index.html"
  exit /b 0
)

start "MIKU PREVIEW %MIKU_PORT%" /min "%NODE%" "%HERE%tools\serve.mjs"
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:%MIKU_PORT%/"
echo [MIKU] preview: http://127.0.0.1:%MIKU_PORT%/   (close the minimized window to stop)
endlocal
