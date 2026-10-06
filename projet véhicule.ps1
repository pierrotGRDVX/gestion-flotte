Start-Process -NoNewWindow python "-m flask run"
Start-Sleep -Seconds 2
Start-Process "http://127.0.0.1:5000/"