import React from "react";
import { connect } from 'react-redux'
import  { fetchUsers  } from '../../store/actions'

import pic from '../../asserts/images/pic2.jpg'


class User extends React.Component {

  
  static initialAction(){
    return fetchUsers()
  }

  componentDidMount() {
    if (!this.props.users || this.props.users.length <= 0) {
      this.props.dispatch(User.initialAction());
    }
  }

  render() {
    return (
      <div className="">
        <h1>ALl User List</h1>
        <img src={pic}/>
        { this.props.users &&
          this.props.users.length > 0 &&
          this.props.users.map((user, i) => <li key={i}>{user.name}</li>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

export default connect(mapStateToProps)(User);
