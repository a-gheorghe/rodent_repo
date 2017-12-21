import React from 'react';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router';
import RaspLogin from './RaspLogin.js';
import RaspExperiments from './RaspExperiments.js';
import RaspSelectedExp from './RaspSelectedExp.js';
import RaspAddAnimal from './RaspAddAnimal.js';
import RaspHome from './RaspHome.js';
import RaspTracking from './RaspTracking.js';
import RaspOptionPage from './RaspOptionPage.js'

class RaspRoot extends React.Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/raspLogin' component={RaspLogin} />
            <Route path='/raspExperiments' exact component={RaspExperiments} />
            <Route path='/raspExperiments/:id' exact component={RaspSelectedExp}/>
            <Route path='/raspExperiments/:id/:name' exact component={RaspOptionPage}/>
            <Route path='/raspExperiments/:id/:name/addAnimals' exact component={RaspAddAnimal}/>
            <Route path='/raspExperiments/:id/:name/trackAnimals' exact component={RaspTracking}/>
            <Route path='/' exact component={RaspHome} />
          </Switch>
        </BrowserRouter>
    );
  }
};

export default RaspRoot;
