// import React from 'react';
// import axios from 'axios';
//
// const config = {
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };
// 
//
// class RaspScan extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       rfid: ''
//     };
//   }
//
//   scanningFunc() {
//     axios.get('/raspScan').then(response => {
//       console.log(response, 'Here is response')
//       this.setState({rfid: response})
//     }).catch(error => console.log('you have an', error))
//   }
//
//   render() {
//     return (
//       <div>
//         <button onClick = {(event) => this.scanningFunc(event)}> Click when ready to scan </button>
//         RFID: <input type="text" name="rfid" value={this.state.rfid}/>
//         Age: <input type="text" name="age" value='' />
//         Sex: <input type="text" name="sex" value='' />
//         Notes: <input type="text" name="notes" value='' />
//
//       </div>
//     );
//   }
// };

export default RaspScan;
