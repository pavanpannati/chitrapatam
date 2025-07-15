# in a script like run.py
import subprocess
import webbrowser

subprocess.Popen(["python", "manage.py", "runserver"], cwd="backend")
subprocess.Popen(["uvicorn", "main:app", "--port", "8001", "--reload"], cwd="fastapi_app")
webbrowser.open("http://localhost:5173")
subprocess.call(["npm", "run", "dev"], cwd="frontend")
