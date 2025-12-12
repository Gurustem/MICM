@echo off
echo ========================================
echo MICM - Pre-Push Checklist
echo ========================================
echo.
echo This script will check if your code is ready to push.
echo.

echo [1/2] Checking for build errors...
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ BUILD FAILED! Please fix errors before pushing.
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo [2/2] Checking git status...
echo.
git status

echo.
echo ========================================
echo ✅ Pre-push checks complete!
echo ========================================
echo.
echo Next steps:
echo 1. Test your app locally: npm run dev
echo 2. Review changes in Cursor (Ctrl+Shift+G)
echo 3. When ready, run: push-and-deploy.bat
echo.
pause

