from flask import Flask, render_template, Response, jsonify
from app import app, db
#from ..views import users

@app.route('/')
def root():
    db.create_all()
    return "Hello World"

# @app.route('/v1/users', methods=['POST'])
# def post_users():
#     return users.post_user()

# Host é o comando para colocar o ip da máquina.