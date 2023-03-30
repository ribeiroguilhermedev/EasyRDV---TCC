from flask import Flask, render_template, Response

app = Flask(__name__)

@app.route('/')
def login():
    return render_template("index.html")

if __name__ == "main":
    app.run(host='0.0.0.0',debug=False) 
    
# Host é o comando para colocar o ip da máquina.
