import React from 'react'

import { NavLink } from 'react-router-dom'

import './Navigation.css'

const Navigation = (props) => {
  return (
    <div className="navbar">
        <ul className="nav">
          <li className="nav-item">
            <NavLink exact to="/" >Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user" >User</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/news" >news</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/user-page" >UserPage</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about-page" >About</NavLink>
          </li>
        </ul>
    </div>
  )
}

export default Navigation
