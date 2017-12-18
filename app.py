from flask import Flask, render_template, jsonify
app = Flask(__name__)

# @app.route('/raspScan')
# def scanAnimal():
#     python code Here
#     return scannedNumber

@app.route('/testing')
def testing():
    code = 5999933
    return jsonify({
    'tag': code
    })

@app.route('/raspExperiments/5/B1')
def maybe():
    return render_template('index.html')


# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#   return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)


# @app.route('/raspScan')
# def scan_animal():
#
#     import RPi.GPIO as GPIO
#     import serial
#     import requests
#
#     ser = serial.Serial('/dev/serial0', 9600)
#
#     GPIO.setmode(GPIO.BOARD)
#     GPIO.setwarnings(False)
#     rfid = 22
#     GPIO.setup(rfid, GPIO.IN)
#
#     junk1 = ser.read(1)
#     rawtag = ser.read(10)
#     tag = int(rawtag, 16)
#     junk2 = ser.read(5)
#
#     return (tag)
