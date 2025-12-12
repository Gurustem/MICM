@echo off
echo ========================================
echo MICM - Push to GitHub and Deploy
echo ========================================
echo.

echo Checking git status...
git status

echo.
echo Adding all changes...
git add .

echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update: Changes from Cursor

echo.
echo Committing changes...
git commit -m "%commit_msg%"

echo.
echo Pushing to GitHub (main branch)...
git push origin main

echo.
echo ========================================
echo Done! Your changes are being pushed to GitHub.
echo Vercel will automatically deploy the changes.
echo ========================================
echo.
echo Your deployment URL: https://micm-a573.vercel.app
echo.
pause

