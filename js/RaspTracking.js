import React from 'react';
import axios from 'axios';
// import './styles/RaspAddAnimal.css';


class RaspTracking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracking: false
    }
  }


  trackAnimals(){
    console.log("tracking")
    axios.get('/tracking')
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
