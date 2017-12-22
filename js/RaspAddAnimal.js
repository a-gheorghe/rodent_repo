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


// / ****** REAL SCAN FUNC ************
  scanAnimal(){
    this.setState({
      message: ''
    })
    axios.get('/addAnimal')
    .then((response) => {
      this.setState({
        rfid: response.data.tag,
        scanned: true
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  // practice scan for no pi
  // scanAnimal(){
  //   console.log("scanning")
  //     this.setState({
  //       rfid: 98347893,
  //       scanned: true
  //     })
  //   }



  handleChange(event) {
    let change = Object.assign({}, this.state)
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('https://hamster-companion.herokuapp.com/new/mouse', {
      "sex": this.state.sex,
      "age": this.state.age,
      "notes": this.state.notes,
      "cageId": this.props.match.params.cageId,
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
        return (
          <div className="add-body">
            <Link className="link-tag" to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}> Back </Link>
            <div className="add-title"> Add a New Animal </div>
            <button className="add-button" type="button" onClick={() => this.scanAnimal()}> Scan animal </button>
            <label className="add-label"> RFID: </label> <input className="add-inputs" type="text" name="rfid" value={this.state.rfid} />

            {this.state.scanned ? (<form onSubmit={(event) => this.handleSubmit(event)}>
            <label className="add-label"> ExperimentID: </label> <input className="add-inputs" type="text" name="experimentID" value={this.props.match.params.id}/> <br/>
            <label className="add-label"> Cage: </label> <input className="add-inputs" type="text" name="cage" defaultValue={this.props.match.params.cageId}/> <br/>
            <label className="add-label"> Age: </label> <input className="add-inputs" type="text" name="age" value={this.state.age} onChange={this.handleChange.bind(this)} /> <br/>
            <label className="add-label"> Sex: </label> <input className="add-inputs" type="text" name="sex" value={this.state.sex} onChange={this.handleChange.bind(this)} /> <br/>
            <label className="add-label"> Notes: </label> <input className="add-inputs" type="text" name="notes" value={this.state.notes} onChange={this.handleChange.bind(this)} /> <br/>
            <input className="add-label" type="submit" value="Add Animal" />
            <Link to="/raspTracking">Track Animals</Link>

            </form> ) : ''}
            <div className="message-text">
              {this.state.message ? <p> {this.state.message} </p> : '' }
            </div>
          </div>
        );
  }
};

export default RaspAddAnimal;
