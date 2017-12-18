import React from 'react';
import axios from 'axios';
// import './styles/RaspAddAnimal.css';

const config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};


class RaspAddAnimal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rfid: 111,
      age: '',
      sex: '',
      notes:''
    }
  }

  handleChange(event) {
    let change = Object.assign({}, this.state)
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3000/new/mouse', {
      "sex": this.state.sex,
      "age": this.state.age,
      "notes": this.state.notes,
      "cageId": 5,
      "id": this.state.rfid
    })
    .then(response => console.log(response))
  }

  render() {
    console.log('adding animals this.props', this.props)
        return (
          <div>
            {/* <button onClick = {(event) => this.scanningFunc(event)}> Click when ready to scan </button>
            RFID: <input type="text" name="rfid" value={this.state.rfid}/> */}
            <div> Add a New Animal </div>
            <form onSubmit={(event) => this.handleSubmit(event)}>

              <label> ExperimentID: </label> {this.props.match.params.id} <br/>
              <label> Experiment Name: </label> I don't know how to pass this in <br/>
              <label> Cage: </label> {this.props.match.params.name} <br/>
              <label> Age: </label> <input type="text" name="age" value={this.state.age} onChange={this.handleChange.bind(this)} /> <br/>
              <label> Sex: </label> <input type="text" name="sex" value={this.state.sex} onChange={this.handleChange.bind(this)} /> <br/>
              <label> Notes: </label> <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange.bind(this)} /> <br/>
              <input type="submit" value="Add Animal" />
            </form>
          </div>
        );
  }
};

export default RaspAddAnimal;
