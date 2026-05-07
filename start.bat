@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ====================================================
echo    O2 工作台 v2.0
echo    前端(Vue):  http://localhost:5173
echo    后端(API):  http://localhost:8527
echo    O2OA服务:   http://localhost:80
echo    O2OA管理:   http://localhost/o2oa/
echo    核销新版:   http://localhost:5173/hexiao-new/
echo    商品搜索:   http://localhost:3266
echo ====================================================
echo.

:: 1. 启动 O2OA 服务器
echo [1/3] 启动 O2OA 服务器...
start "O2OA" cmd /c "cd /d %~dp0o2server && start_windows.bat"
timeout /t 5 /nobreak >nul

:: 2. 启动工作台后端 (FastAPI)
echo [2/3] 启动工作台后端...
start "后端" cmd /c "cd /d %~dp0backend && %USERPROFILE%\AppData\Local\Programs\Python\Python314\python.exe main.py"
timeout /t 3 /nobreak >nul

:: 3. 启动工作台前端 (Vite)
echo [3/3] 启动工作台前端...
start "前端" cmd /c "cd /d %~dp0 && npx vite --port 5173"
timeout /t 2 /nobreak >nul

:: 打开浏览器
start http://localhost:5173

echo.
echo [OK] O2 工作台已全部启动！
echo [OK] 关闭此窗口不影响后台运行。
echo [OK] 按任意键关闭此窗口...
pause >nul
