from flask import Flask, render_template, jsonify
app = Flask(__name__)

# @app.route('/raspScan')
# def scanAnimal():
#     python code Here
#     return scannedNumber

# @app.route('/testing')
# def testing():
#     code = 5999933
#     return jsonify({
#     'tag': code
#     })
#
# @app.route('/raspExperiments/5/B1')
# def maybe():
#     return render_template('index.html')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/testing/')
def testing():

    import RPi.GPIO as GPIO
    import serial

    ser = serial.Serial('/dev/serial0', 9600)

    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    rfid = 22
    GPIO.setup(rfid, GPIO.IN)

    junk1 = ser.read(1)
    rawtag = ser.read(10)
    tag = int(rawtag, 16)
    junk2 = ser.read(5)

    return jsonify({
    'tag': tag
    })

@app.route('/<path:others>')
def catch_all(others):
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
