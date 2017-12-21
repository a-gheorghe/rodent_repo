import React from 'react';
import axios from 'axios';
import './styles/RaspTracking.css';


class RaspTracking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracking: false
    }
  }


  trackAnimals(){
    console.log("tracking")
    axios.get('/raspTracking')
    .then((response) => {
      console.log(response)
      this.setState({
        tracking: true
      })
    })
    .catch((error) => {
      console.log("oops", error)
    })
  }


  render() {
        return (
          <div>
            <div> Animals are running </div>
            <button type="button" onClick={() => this.trackAnimals()}> Track Animals </button>

          </div>
        );
  }
};


export default RaspTracking;
