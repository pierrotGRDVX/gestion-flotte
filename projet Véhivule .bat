@echo off
start python -m flask run
timeout /t 2 >nul
start "" "http://127.0.0.1:8080/"