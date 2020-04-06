import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);
    
    let initialData;
    if(props.initialData){      
      initialData = props.initialData
    } else {
      initialData = window.__initialData__;
      delete window.__initialData__
    }

    this.state = { users: initialData }
  }


  // componentDidMount() {
  //   console.log(this.state);
  //   axios.get('/api/users').then(data=>{
  //     this.setState({users: data})
  //   })
  // }

  render() {
    return (
      <div className="App">
        <h1>This is Server Side Rendering</h1>
        <h1>ALl User List</h1>
        <User users={this.state.users} />
      </div>
    );
  }
}

const User = (props) => {
  return (
    <div>
      {  props.users && props.users.length > 0 && props.users.map((user, i) => (
        <li key={i}>{user.name}</li>
      ))}
    </div>
  );
};

export default App;
