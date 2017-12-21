from flask import Flask, render_template, jsonify
app = Flask(__name__)


import RPi.GPIO as GPIO
import serial
from datetime import datetime, date, time, timedelta
import requests


GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
hall = 22
GPIO.setup(hall, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
rfid = 13
button = 31
GPIO.setup(button, GPIO.IN)
GPIO.setup(rfid, GPIO.IN)

button_pressed = [False]

#
def my_callback (channel):
    button_pressed[0] = True
    print("Pressed button")
    print(GPIO.input(button))

GPIO.add_event_detect(hall, GPIO.RISING)
GPIO.add_event_detect(button, GPIO.RISING, callback=my_callback, bouncetime= 10000)




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

# for testing /tracking
# @app.route('/tracking/')
# def tracking():
#     session_data = "This is mock session data"
#     return jsonify({
#     "message": session_data
#     })

@app.route('/tracking/')
def tracking():
    ser = serial.Serial('/dev/serial0', 9600)
    button_pressed[0] = False
    # session_data = False



    def begin():
        print("Start running")

    def checkClose(last_rev, count, start_time, tag):
        current_time = datetime.now()
        if  current_time - last_rev > timedelta(seconds = 5):
            revolutions = round(count)
            start_time = start_time
            end_time = last_rev
            print("Session ending")
            session_data = {
                    "revolutions": revolutions,
                    "start_time": start_time,
                    "end_time": end_time,
                    "mouseId": tag
                    }
            r = requests.post('https://hamster-companion.herokuapp.com/new/session', data = session_data)
            print(r.text)
            return True

        return False

    def loop():
            session = False
            count = 0
            last_rev = None
            start_time = None
            tag = None
            rfid_reading = False

            while (button_pressed[0] == False):
                    if (rfid_reading == False and GPIO.input(rfid)):
                            rfid_reading = True
                            print("Entering 2")
                            junk1 = ser.read(1)
                            rawtag = ser.read(10)
                            tag = int(rawtag, 16)
                            junk2 = ser.read(5)
                            print("Entering 3")
                            print('Animal', tag)
                            print(rfid_reading)

                    if (rfid_reading == True):
                            if last_rev is not None:
                                    check_close_result = checkClose(last_rev, count, start_time, tag)
                                    if check_close_result:
                                            session = False
                                            last_rev = None
                                            count = 0
                                            rfid_reading = False
                                            tag = None
                                            start_time = None

                            if GPIO.event_detected(hall):
                                    print('magnet is detected')
                                    if not session:
                                            print("Entering 4")
                                            session = True
                                            start_time = datetime.now()
                                            print("Session starting at {}".format(start_time))
                                            print("Entering 5")
                                    count +=0.5
                                    last_rev = datetime.now()
                                    print("Animal {} has run {} revolutions".format(tag, count))

    def destroy():
            GPIO.cleanup()


    if __name__=='__main__':
        begin()
        try:
            loop()
            return jsonify({
                "message": "This is mock session data"
                })

        except KeyboardInterrupt:
            destroy()

@app.route('/addAnimal/')
def testing():

    import RPi.GPIO as GPIO
    import serial

    ser = serial.Serial('/dev/serial0', 9600)

    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    rfid = 13
    GPIO.setup(rfid, GPIO.IN)

    junk1 = ser.read(1)
    rawtag = ser.read(10)
    tag = int(rawtag, 16)
    junk2 = ser.read(5)

    return jsonify({
    'tag': tag
    })


# @app.route('/addAnimal/')
# def testing():
#     return "hello"

@app.route('/<path:others>')
def catch_all(others):
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
