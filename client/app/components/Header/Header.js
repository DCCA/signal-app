import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
  <header className='container'>
    <Link className='signal fas fa-signal' to="/"></Link>
    <Link className='logo' to="/">Signal</Link>
  </header>
);

export default Header;
