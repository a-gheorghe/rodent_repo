
# rodent_repo

This repo contains code that works alongside the code in the repo <b> official_hamstercompanion </b>. In this project, we created the hardware and software to track rodent running behaviour for use in a research setting. 

The project consists of two apps: 
1. The Raspberry Pi (RPi) app (this repo) 
2. The web app (official_hamstercompanion repo)

This app is run locally on localhost:5051 on a Flask backend server. To use:

``` pip install virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
npm install -g webpack
npm install
```

In two separate terminals, run `python app.py` and `webpack --watch`

Opening up localhost:5051 will take you to the main page of the RPi app.

The user must be registered through the companion app at http://hamster-companion.herokuapp.com/.

Some screenshots from the app:

Login
![alt text](https://github.com/a-gheorghe/rodent_repo/blob/master/screenshots/login.png)

Cage listings for particular experiment
![alt text](https://github.com/a-gheorghe/rodent_repo/blob/master/screenshots/cage_list.png)

Option to add new animal or start tracking activity
![alt text](https://github.com/a-gheorghe/rodent_repo/blob/master/screenshots/options.png)

Adding a new animal (RFID number added on RFID scan)
![alt text](https://github.com/a-gheorghe/rodent_repo/blob/master/screenshots/add_animal.png)












