from flask import Flask, render_template, Response
import cv2
import os
import pdb
from pyzbar import pyzbar

app = Flask(__name__)
app.config['DEBUG'] = True

def cls():
    os.system('cls' if os.name=='nt' else 'clear')
cls()

# face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def generate():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    detector = cv2.QRCodeDetector()

    if not cap.isOpened():
        print("Não foi possível abrir a câmera.")
    else:
        while True:
            ret, frame = cap.read()
            if ret:
                
                (flag, encodedImage) = cv2.imencode(".jpg", frame)
                if not flag:
                    continue
                yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
    cap.release()

@app.route('/')
def login():
    return render_template("index.html")

@app.route("/video_feed")
def video_feed():
    image = cv2.imread('qrcode.jpeg')

    # Converte a imagem para escala de cinza
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Realiza a leitura do código de barras ou QR Code na imagem
    decoded_objects = pyzbar.decode(gray)

    # Itera sobre os objetos decodificados
    for obj in decoded_objects:
        # Imprime o tipo do código de barras ou QR Code
        print('Tipo: ', obj.type)
        # Imprime o valor do código de barras ou QR Code
        print('Valor: ', obj.data.decode('utf-8'))

    # Exibe a imagem na tela
    cv2.imshow('Imagem', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return Response(generate(), mimetype= "multipart/x-mixed-replace; boundary=frame")

if __name__ == "main":
    app.run(host='0.0.0.0',debug=True) 
    
# Host é o comando para colocar o ip da máquina.
