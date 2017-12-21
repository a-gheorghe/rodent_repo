import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './styles/RaspHome.css';



class RaspHome extends React.Component {
  render() {
    return (
      <div className="top-level-home">

          <div className="home-top-third">
            <div className="home-title"> Rodent Activity Companion </div>
            <img className="mouse" src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/>
          </div>

          <div className="bottom-two-thirds">
            <div className="home-middle-third"> Streamlines data collection so you can focus on results </div>
            <div className="home-bottom-third">
              <img className="main-picture" src={'https://s-i.huffpost.com/gen/1703128/images/o-DRUG-RESEARCH-facebook.jpg'}/>
              <Link className="login-link" to="/raspLogin">Login</Link>
            </div>
          </div>
        </div>
    );
  }
};

export default RaspHome;
