import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import axios from 'axios';
import './styles/RaspLogin.css';


const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

class RaspLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raspLoggedIn: false
    };
  }

  submit(event) {
    event.preventDefault();
    console.log('working')
    axios.post('https://hamster-companion.herokuapp.com/api/login',  {
        username: event.target.username.value,
        password: event.target.password.value
    },config).then(response => {
      console.log(response)
      if (response.data) {
        this.setState({raspLoggedIn: true});
      }
    }).catch((error) => {
      console.log('your error is', error);
    });
  }

  render() {
    return (
      this.state.raspLoggedIn ?
        <Redirect to="/raspExperiments"/> :
        <div className="top-level-login">
          <form className="form-login" onSubmit={event => this.submit(event)}>
            <h3 className="title-login">Login</h3>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" />
          </form>
        </div>
      );
    }
  }

export default RaspLogin;
