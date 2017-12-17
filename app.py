from flask import Flask, render_template
app = Flask(__name__)

# @app.route('/raspScan')
# def scanAnimal():
#     python code Here
#     return scannedNumber

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template('index.html')

if __name__ == '__main__':
  app.run(debug=True)
