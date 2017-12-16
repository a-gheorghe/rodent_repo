import React from 'react';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import { Route, Redirect, Switch } from 'react-router';
import RaspLogin from './RaspLogin.js';
import RaspExperiments from './RaspExperiments.js';
import RaspSelectedExp from './RaspSelectedExp.js';
import RaspHome from './RaspHome.js';

class RaspRoot extends React.Component {
  render() {
    return (
      <div>
        <h1> Rodent Companion </h1>
        <BrowserRouter>
          <Switch>
            <Route path='/raspLogin' component={RaspLogin} />
            <Route path='/raspExperiments' exact component={RaspExperiments} />
            <Route path='/raspExperiments/:id' component={RaspSelectedExp}/>
            <Route path='/' component={RaspHome} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
};

export default RaspRoot;
