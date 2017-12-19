import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './styles/RaspHome.css';



class RaspHome extends React.Component {
  render() {
    return (
      <div className="wholePage">
        <div className="topHalf">
          <div className="title">
            Rodent Activity Companion
            <Link to="/raspLogin">Login</Link>
          </div>
          <div className="description">
            Streamlines data collection so you can focus on results
          </div>
        </div>
        <div className="bottomHalf">
          put a picture here or something
        </div>
      </div>
    );
  }
};

export default RaspHome;
