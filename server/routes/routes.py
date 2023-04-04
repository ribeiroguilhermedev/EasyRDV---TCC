from flask import Flask, render_template, Response, jsonify

@app.route('/', methods=['GET'])
def login():
    return jsonify({'message': 'Hello World'})

# Host é o comando para colocar o ip da máquina.