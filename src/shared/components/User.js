import React from "react";

import axios from "axios";
import "isomorphic-fetch";

class User extends React.Component {
  constructor(props) {
    super(props);
    let initialData;
    if (props.staticContext) {
      initialData = props.staticContext.initialData;
    } else {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }

    this.state = { users: initialData };
  }

  static requestInitialData(){
    return fetch('http://localhost:3000/api/users')
      .then(response=> response.json())
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/users')
    .then(response=> response.json())
    .then(users=>{
      this.setState({users})
    })
  }

  render() {
    return (
      <div className="">
        <h1>ALl User List</h1>
        { this.state.users &&
          this.state.users.length > 0 &&
          this.state.users.map((user, i) => <li key={i}>{user.name}</li>)}
      </div>
    );
  }
}

export default User;
