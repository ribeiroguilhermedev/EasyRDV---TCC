from flask import Flask, render_template, Response
from flask_migrate import Migrate
import pymssql
from db import cnxn   

app = Flask(__name__)


# migrate = Migrate(app, db)

# from model.user import User

@app.route('/')
def login():
    return "Hello World"


if __name__ == "main":
    app.run(debug=False)

    
    
# Host é o comando para colocar o ip da máquina.