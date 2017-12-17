import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom'


class RaspHome extends React.Component {
  render() {
    return (
      <div>
        HOME HOME HOME HOME HOME hello<br/>
        <Link to="/raspLogin">Login</Link>
      </div>
    );
  }
};

export default RaspHome;
