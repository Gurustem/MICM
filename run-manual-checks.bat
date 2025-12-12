@echo off
echo ========================================
echo MICM - Manual Pre-Push Checks
echo ========================================
echo.
echo This will guide you through the 3 essential checks.
echo.

:menu
echo.
echo Select a check to run:
echo.
echo [1] Test Locally (npm run dev)
echo [2] Build Check (npm run build)
echo [3] Review in Cursor (opens Source Control)
echo [4] Run All Checks
echo [5] Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto test_local
if "%choice%"=="2" goto build_check
if "%choice%"=="3" goto review_cursor
if "%choice%"=="4" goto all_checks
if "%choice%"=="5" goto end
goto menu

:test_local
echo.
echo ========================================
echo CHECK 1: Testing Locally
echo ========================================
echo.
echo Starting development server...
echo.
echo Instructions:
echo 1. Wait for server to start
echo 2. Open http://localhost:5173 in your browser
echo 3. Test your changes
echo 4. Press Ctrl+C in this window to stop the server
echo.
call npm run dev
echo.
echo Press any key to continue...
pause >nul
goto menu

:build_check
echo.
echo ========================================
echo CHECK 2: Build Check
echo ========================================
echo.
echo Running production build...
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ BUILD FAILED!
    echo Please fix the errors above before pushing.
    echo.
    pause
    goto menu
) else (
    echo.
    echo ✅ Build successful! Your code is ready.
    echo.
    pause
    goto menu
)

:review_cursor
echo.
echo ========================================
echo CHECK 3: Review in Cursor
echo ========================================
echo.
echo To review your changes:
echo.
echo 1. In Cursor, press Ctrl+Shift+G
echo 2. Review the files in "Changes" section
echo 3. Click on files to see what changed
echo 4. Stage files you want to commit (+ icon)
echo 5. Unstage files you don't want (- icon)
echo.
echo Make sure to check:
echo - No debug code (console.log, debugger)
echo - No sensitive information
echo - Only intended files are staged
echo.
pause
goto menu

:all_checks
echo.
echo ========================================
echo Running All Checks
echo ========================================
echo.

echo [1/3] Build Check...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Build failed! Fix errors before continuing.
    pause
    goto menu
)
echo ✅ Build check passed!
echo.

echo [2/3] Git Status...
git status
echo.

echo [3/3] Next Steps:
echo.
echo 1. Test locally: npm run dev
echo 2. Review in Cursor: Press Ctrl+Shift+G
echo 3. When ready: push-and-deploy.bat
echo.
pause
goto menu

:end
echo.
echo Goodbye!
exit

