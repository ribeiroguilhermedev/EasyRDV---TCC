import cv2
import os
import pdb
from pyzbar import pyzbar

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