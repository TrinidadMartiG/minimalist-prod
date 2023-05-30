import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import logo from '../img/open-book.svg'

const Navigation = () => {
  return (
    <>
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            <span className="nav-title">Minimalist Productivity</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
