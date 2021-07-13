import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import HeaderUser from '../HeaderUser';

import logo from '../../assets/logo.svg';

import './AppHeader.scss';

const AppHeader = () => (
  <Navbar className="app-header" variant="dark" expand="lg" sticky="top">
    <Navbar.Brand as={Link} to="/">
      <img className="logo" src={logo} width="108" height="30" alt="Логотип" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
      <Nav>
        <Nav.Link as={NavLink} to="/new-case">
          Новое обращение
        </Nav.Link>
      </Nav>
      <Nav>
        <HeaderUser />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AppHeader;
