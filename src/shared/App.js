import React from "react";
import { Switch, Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import "./App.css";


import Navigation from './components/Navigation/Navigation'

import routes from './routes'

const App = (props) => {

  return (
      <div className="App">
        <Navigation/>
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
