import React from 'react';
import axios from 'axios';
import './styles/RaspTreatmentGroup.css';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspTreatmentGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {

  }

  render() {
  console.log(this.props.treatment)
    return (
        <div className="divStyle">
          {this.props.treatment.name}

          {this.props.treatment.cages.map((cage) => <li>{cage.name}</li>)}

        </div>
    );
  }
};

export default RaspTreatmentGroup;
