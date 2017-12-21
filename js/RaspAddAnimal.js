import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import './styles/RaspAddAnimal.css';

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
      rfid: '',
      age: '',
      sex: '',
      notes:'',
      scanned: false,
      message: ''
    }
  }



  // scanAnimal(){
  //   console.log("scanning")
  //   axios.get('/testing')
  //   .then((response) => {
  //     this.setState({
  //       rfid: response.data.tag,
  //       scanned: true
  //     })
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  // practice scan for no pi
  scanAnimal(){
    console.log("scanning")
      this.setState({
        rfid: 4333,
        scanned: true
      })
    }



  handleChange(event) {
    let change = Object.assign({}, this.state)
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("sending to database")
    axios.post('http://4bc7328c.ngrok.io/new/mouse', {
      "sex": this.state.sex,
      "age": this.state.age,
      "notes": this.state.notes,
      "cageId": 5,
      "id": this.state.rfid
    })
    .then((response) => {
      this.setState({
        message: 'Successfully added new mouse!',
        rfid: '',
        age: '',
        sex: '',
        notes:'',
        scanned: false,
      })
    })
    .catch((error) => {
      this.setState({
        message: 'Oops. Something went wrong. Your error was:' + error
      })
    })
  }


  render() {
    console.log('adding animals this.props', this.props)
        return (
          <div className="add-body">
            <div className="add-title"> Add a New Animal </div>
            <button className="add-button" type="button" onClick={() => this.scanAnimal()}> Scan animal </button>
            <label> RFID: </label> <input type="text" name="rfid" value={this.state.rfid} />

            {this.state.scanned ? (<form onSubmit={(event) => this.handleSubmit(event)}>
              <label> ExperimentID: </label> <input type="text" name="experimentID" value={this.props.match.params.id}/> <br/>
              <label> Experiment Name: </label> <input type="text" name="experimentName" defaultValue="How to pass this in?"/> <br/>
              <label> Cage: </label> <input type="text" name="cage" defaultValue={this.props.match.params.name}/> <br/>
              <label> Age: </label> <input type="text" name="age" value={this.state.age} onChange={this.handleChange.bind(this)} /> <br/>
              <label> Sex: </label> <input type="text" name="sex" value={this.state.sex} onChange={this.handleChange.bind(this)} /> <br/>
              <label> Notes: </label> <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange.bind(this)} /> <br/>
              <input type="submit" value="Add Animal" />
              <Link to="/raspTracking">Track Animals</Link>

              {this.state.message ? <p> {this.state.message} </p> : ''}
            </form> ) : ''}
          </div>
        );
  }
};

export default RaspAddAnimal;
