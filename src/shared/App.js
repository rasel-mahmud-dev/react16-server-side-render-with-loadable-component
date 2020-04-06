import React from "react";
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import "./App.css";



import routes from './routes'

const App = (props) => {

  return (
      <div className="App">
        <h1>This is App</h1>
        <NavLink to="/" >user</NavLink>
        <NavLink to="/news" >news</NavLink>
        <br/>
        
        <Switch>
          { routes.map(((route, i)=> <Route key={i} {...route} /> ))}
        </Switch>
      </div>
    );
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps)(App)
