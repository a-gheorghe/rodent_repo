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

@app.route('/tracking/')
def tracking():
    import RPi.GPIO as GPIO
    import serial
    from datetime import datetime, date, time, timedelta

    ser = serial.Serial('/dev/serial0', 9600)

    GPIO.setmode(GPIO.BOARD)
    GPIO.setwarnings(False)
    hall = 22
    GPIO.setup(hall, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    rfid = 13
    GPIO.setup(rfid, GPIO.IN)

    def begin():
        print("Start running")

    def checkClose(last_rev, count, start_time, tag):
        current_time = datetime.now()
        if  current_time - last_rev > timedelta(seconds = 5):
            revolutions = count
            start_time = start_time
            end_time = last_rev
            print("Session ending")
            session_data = {
                    "revolutions": revolutions,
                    "start_time": start_time,
                    "end_time": end_time,
                    "mouseId": tag
                    }
                # r = requests.post('https://24a46cb5.ngrok.io/new/session', data = session_data)
            return jsonify ({
            "session_data": session_data
            })

        return False

    def loop():
            session = False
            count = 0
            last_rev = None
            start_time = None
            tag = None
            rfid_reading = False

            while True:
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
                                    count +=1
                                    last_rev = datetime.now()
                                    print("Animal {} has run {} revolutions".format(tag, count))

    def destroy():
            GPIO.cleanup()


    if __name__=='__main__':
        begin()
        try:
            GPIO.add_event_detect(hall, GPIO.RISING)
            loop()
        except KeyboardInterrupt:
            destroy()

@app.route('/testing/')
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

@app.route('/<path:others>')
def catch_all(others):
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
