//import { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Footer from './components/Footer/Footer'
import { Col, Container, Row } from 'react-bootstrap'


function AgentInterface() {
  return (
    <>
      <Container fluid>
        <Col>
          <SideBar />
        </Col>

        <Col>
          <Row>
            <NavBar />
          </Row>
          <Row>
            <Container>

            </Container>
          </Row>
          <Row>
            <Footer />
          </Row>
        </Col>
      </Container>
    </>
  )
}

export default AgentInterface
