import React from "react";
import "./App.css";

import { Switch, Route, NavLink } from 'react-router-dom'


import routes from './routes'
const App = () => {
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

export default App;
