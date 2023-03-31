from flask import Flask, render_template, Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pymssql

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pymssql://easyrdv:zPKd;9z;m$ftop9S@35.198.11.196/easyrdv'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

migrate = Migrate(app, db)

from model.user import User

@app.route('/')
def login():
    return render_template("index.html")


if __name__ == "main":
    db.create_all()
    app.run(host='0.0.0.0',debug=False)
    
# Host é o comando para colocar o ip da máquina.