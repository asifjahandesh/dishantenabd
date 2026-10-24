@echo off
set /p msg="Enter update commit message (or press Enter for default): "
if "%msg%"=="" set msg="Update website and channels"

echo.
echo [1/3] Staging changes...
git add .

echo [2/3] Committing changes...
git commit -m "%msg%"

echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo =======================================================
echo Success! Pushed to GitHub.
echo Cloudflare is now automatically updating your live site!
echo =======================================================
echo.
pause
