
# rodent_repo

This repo contains code that works alongside the code in the repo <b> hamsterCompanion </b>. In this project, we created the hardware and software to track rodent running behaviour for use in a research setting. 

The project consists of two apps: 
1. The Raspberry Pi (RPi) app (this repo) 
2. The web app (hamsterCompanion repo)

This app is run locally on localhost:5051 on a Flask backend server. To use:

``` pip install virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
npm install -g webpack
npm install
```

In two separate terminals, run `python app.py` and `webpack --watch`

Opening up localhost:5051 should take you to the main page of the RPi app



