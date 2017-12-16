import React from 'react';
import axios from 'axios';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspSelectedExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    axios.get('http://localhost:3000/api/experiment/' + this.props.match.params.id, config)
    .then(response => console.log(response.data))

  }


  render() {
    return (
        <div>
          This particular experiment
        </div>
    );
  }
};

export default RaspSelectedExp;
