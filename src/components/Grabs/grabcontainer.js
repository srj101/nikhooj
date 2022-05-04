import React from 'react'
import Grab from './Grab/Grab'
import GrabsDummy from './GrabsDummy'
import './grabContainer.css'
import { Container, Row } from 'react-bootstrap';


const Grabcontainer = () => {
  return (
    <div className='grabContainer'>
      <Container>
        <Row>
            {GrabsDummy.grabs.map(grab => <Grab grab={grab}/>)}
        </Row>
      </Container>
    </div>
  )
}

export default Grabcontainer