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
      message: '',
      id: '',
      cageId: ''
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
        id: this.props.match.params.id,
        cageId: this.props.match.params.cageId,

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
  //   this.setState({
  //     rfid: 98347893,
  //     scanned: true
  //   })
  // }



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
      <div className="page-box">
        <h1>Add Animal</h1>
        <Link className="link-tag"
          to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}>
          Back
        </Link>
        <div className="form-box">
          <button className="add-button" type="button" onClick={() => this.scanAnimal()}> Scan animal </button>
          <div className="form-style-3">
            <form onSubmit={e => this.handleSubmit(e)}>
              <fieldset>
                {/* <legend>New Animal Information</legend> */}
                <label htmlFor="rfid">
                  <span>RFID <span className="required">*</span></span>
                  <input onChange={e => this.handleChange(e)} type="text" name="rfid" value={this.state.rfid} />
                </label>
                <label htmlFor="id">
                  <span>Experiment ID <span className="required">*</span></span>
                  <input onChange={e => this.handleChange(e)} type="text" name="id" value={this.state.id} />
                </label>
                <label htmlFor="cageId">
                  <span>Cage ID <span className="required">*</span></span>
                  <input onChange={e => this.handleChange(e)} type="text" name="cageId" value={this.state.cageId} />
                </label>
                <label htmlFor="sex">
                  <span>Sex <span className="required">*</span></span>
                  <span id="sex-option">
                  <input onChange={e => this.handleChange(e)} type="radio" name="sex" value="M" checked={this.state.sex === 'M'} />
                  <p>Male</p>
                  <input onChange={e => this.handleChange(e)} type="radio" name="sex" value="F" checked={this.state.sex === 'F'} />
                  <p>Female</p>
                </span>
                </label>
                <label htmlFor="age">
                  <span>Age <span className="required">*</span></span>
                  <input onChange={e => this.handleChange(e)} type="number" name="age" value={this.state.age} />
                </label>
                <label htmlFor="notes">
                  <span>Notes</span>
                  <input type="text" name="notes" rows="5" cols="20" onChange={e => this.handleChange(e)} value={this.state.notes} />
                </label>
                <input style={{ backgroundColor: '#0074D9' }} type="submit" value="Add Animal" />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    )
  }
};

export default RaspAddAnimal;
