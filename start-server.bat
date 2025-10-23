@echo off
echo ========================================
echo    Whale Circle - Local Server Launcher
echo ========================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Python detected!
    echo.
    echo Starting local server on http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    echo Opening browser in 3 seconds...
    timeout /t 3 >nul
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo [INFO] Python not found. Trying Node.js...
    echo.

    :: Check if Node.js is installed
    node --version >nul 2>&1
    if %errorlevel% equ 0 (
        echo [OK] Node.js detected!
        echo.
        echo Installing http-server (if needed)...
        call npx -y http-server -p 8000 -o
    ) else (
        echo.
        echo [!] Neither Python nor Node.js found!
        echo.
        echo OPTION 1: Simply double-click "index.html" to view the site
        echo.
        echo OPTION 2: Install Python from python.org or Node.js from nodejs.org
        echo           Then run this script again.
        echo.
        pause
    )
)
