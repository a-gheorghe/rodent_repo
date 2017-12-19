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
      rfid: '',
      age: '',
      sex: '',
      notes:'',
      scanned: false
    }
  }

  // componentDidMount(){
  //   axios.get('/testing')
  //   .then((response) => {
  //     this.setState({rfid: response.data.tag})
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  // }

  scanAnimal(){
    axios.get('/testing')
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


  handleChange(event) {
    let change = Object.assign({}, this.state)
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://b577bdfc.ngrok.io/new/mouse', {
      "sex": this.state.sex,
      "age": this.state.age,
      "notes": this.state.notes,
      "cageId": this.props.match.params.name,
      "id": this.state.rfid
    })
    .then(response => console.log(response))
  }

  handleSubmit(event) {
    event.preventDefault()

  }

  render() {
    console.log('adding animals this.props', this.props)
        return (
          <div>
            {/* <button onClick = {(event) => this.scanningFunc(event)}> Click when ready to scan </button>
            RFID: <input type="text" name="rfid" value={this.state.rfid}/> */}
            <div> Add a New Animal </div>
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <button onClick={() => this.scanAnimal()}> Scan animal </button>
              <label> RFID: </label> <input type="text" name="rfid" value={this.state.rfid} /> <br/>
              <label> ExperimentID: </label> <input type="text" name="experimentID" value={this.props.match.params.id}/> <br/>
              <label> Experiment Name: </label> <input type="text" name="experimentName" defaultValue="How to pass this in?"/> <br/>
              <label> Cage: </label> <input type="text" name="cage" defaultValue={this.props.match.params.name}/> <br/>
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
