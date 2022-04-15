import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";
import './sidebar.css';

function Sidebar() {
  return (
    <Menu>
      <Link to="/">Home</Link>
      <Link to="/Forecast">Today's Forecast</Link>
      <Link to="/Detailed">Detailed Weather</Link>
      <hr></hr>
      <Link to="/Settings">Settings</Link>
    </Menu>
  );
};

export default Sidebar
