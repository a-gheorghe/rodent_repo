import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './styles/RaspHome.css';



class RaspHome extends React.Component {
  render() {
    return (
      <div className="top-level-home">

          <div className="home-top-third">
            <div className="home-title"> Hamster Companion </div>
            <img className="mouse" src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/>
          </div>

          <div className="bottom-two-thirds">
            <div className="home-middle-third"> Raspberry Pi Interface </div>
            <div className="home-bottom-third">
                <img className="main-picture" src={'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Raspberry_Pi_Logo.svg/411px-Raspberry_Pi_Logo.svg.png'}/>
                <Link className="login-link" to="/raspLogin">Login</Link>
            </div>
          </div>
        </div>
    );
  }
};

export default RaspHome;
