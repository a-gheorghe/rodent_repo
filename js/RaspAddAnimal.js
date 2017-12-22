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
        // return (
        //   <div className="add-body">
        //     <Link className="link-tag" to={`/raspExperiments/${this.props.match.params.id}/${this.props.match.params.cageId}`}> Back </Link>
        //     <div className="add-title"> Add a New Animal </div>
        //     <button className="add-button" type="button" onClick={() => this.scanAnimal()}> Scan animal </button>
        //     <label className="add-label"> RFID: <input className="add-inputs" type="text" name="rfid" value={this.state.rfid}/> </label>
        //
        //     {this.state.scanned ? (<form className="add-animal-form" onSubmit={(event) => this.handleSubmit(event)}>
        //     <label className="add-label"> <p>ExperimentID: </p>  <input className="add-inputs" type="text" name="experimentID" value={this.props.match.params.id}/> </label><br/>
        //     <label className="add-label"> <p> Cage: </p>  <input className="add-inputs" type="text" name="cage" defaultValue={this.props.match.params.cageId}/> </label> <br/>
        //     <label className="add-label"> Age: <input className="add-inputs" type="text" name="age" value={this.state.age} onChange={this.handleChange.bind(this)}/> </label> <br/>
        //     <label className="add-label"> Sex: <input className="add-inputs" type="text" name="sex" value={this.state.sex} onChange={this.handleChange.bind(this)}/> </label> <br/>
        //     <label className="add-label"> Notes: <input className="add-inputs" type="text" name="notes" value={this.state.notes} onChange={this.handleChange.bind(this)}/> </label> <br/>
        //     <input className="add-label" type="submit" value="Add Animal" />
        //     <Link to="/raspTracking">Track Animals</Link>
        //
        //     </form> ) : ''}
        //     <div className="message-text">
        //       {this.state.message ? <p> {this.state.message} </p> : '' }
        //     </div>
        //   </div>
        // );
        return (
          <div className="page-box">
            <h1>Add Animal</h1>
            <div className="form-box">
              <div className="form-style-3">
                <form>
                  <fieldset><legend>New Animal Information</legend>
                  <label htmlFor="field1"><span>RFID <span className="required">*</span></span><input type="text" className="input-field" name="field1" value="" /></label>
                  <label htmlFor="field2"><span>Experiment ID <span className="required">*</span></span><input type="email" className="input-field" name="field2" value="" /></label>
                  <label htmlFor="field3"><span>Cage ID <span className="required">*</span></span><input type="text" className="input-field" name="field3" value="" /></label>
                  <label htmlFor="field4"><span>Sex <span className="required">*</span></span>
                  <input type="text" name="field4" value="" />

                  {/* <select name="field4" className="input-field">
                    <option value="Appointment">Female</option>
                    <option value="Interview">Male</option>
                  </select> */}
                </label>
                  <label htmlFor="field5"><span>Age <span className="required">*</span></span><input type="text" className="input-field" name="field5" value="" /></label>
                  <label for="field6"><span>Notes </span><textarea name="field6" class="textarea-field"></textarea></label>

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
