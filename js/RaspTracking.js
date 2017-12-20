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

  componentDidMount(){
    console.log("tracking")
    axios.get('/tracking')
    .then((response) => {
      this.setState({
        tracking: true
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  render() {
        return (
          <div>
            <div> Animals are running </div>
          </div>
        );
  }
};


export default RaspTracking;
