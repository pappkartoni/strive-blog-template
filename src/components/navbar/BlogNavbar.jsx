import React, { useState } from "react";
import { Button, Container, Modal, Navbar } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import "./styles.css";
const NavBar = (props) => {
  return (
      <Navbar expand="lg" className="blog-navbar" fixed="top">
        <Container className="justify-content-between">
          <Navbar.Brand as={Link} to="/home">
            <img className="blog-navbar-brand" alt="logo" src="logo.svg" />
          </Navbar.Brand>
          {window.localStorage.getItem("token") && <div><Button
            as={Link}
            to="/new"
            className="blog-navbar-add-button bg-dark"
            size="lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
            </svg>
            Post Article
          </Button>
          <Button as={Link} to="/" onClick={() => window.localStorage.clear()}>Log out</Button></div>}
        </Container>
      </Navbar>
  );
};

export default NavBar;
