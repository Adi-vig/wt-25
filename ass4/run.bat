@echo off
echo Starting React and Spring Boot applications...

:: Navigate to Spring Boot app directory and start it
cd ./backend/backend
echo Starting Spring Boot app...
start cmd /k "mvnw spring-boot:run"

:: Navigate to React app directory and start it
cd ..\..\result-cal
echo Starting React app...
start cmd /k "npm run dev"

echo Both applications are starting. Press any key to exit this script.
pause
