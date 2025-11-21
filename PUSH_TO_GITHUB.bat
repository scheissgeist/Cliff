@echo off
echo.
echo ========================================
echo  GitHub Push Script
echo ========================================
echo.
echo Please enter your GitHub username:
set /p GITHUB_USERNAME="Username: "

echo.
echo Connecting to GitHub repository...
git remote add origin https://github.com/%GITHUB_USERNAME%/Cliff.git

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Pushing code to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Done! 
echo ========================================
echo.
echo Next steps:
echo 1. Go to https://github.com/%GITHUB_USERNAME%/Cliff
echo 2. Click Settings ^> Pages
echo 3. Select "main" branch under Source
echo 4. Click Save
echo.
echo Your site will be at: https://%GITHUB_USERNAME%.github.io/Cliff/
echo.
pause

