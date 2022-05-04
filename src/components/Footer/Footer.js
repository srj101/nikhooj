import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { Container, Row,Col } from 'react-bootstrap';
import { FaHome, FaFacebookMessenger, FaRegPlusSquare, FaRegUser, FaSearch } from 'react-icons/fa';
const Footer = () => {
    return (
        <div className='footer__area'>
            <Container>
                <Row>
                    <Col>
                        <div className="footer_navs">
                            <Link to='/' className="nav_icon">

                                <FaHome />

                            </Link>
                            <Link to='/search' className="nav_icon">
                                <FaSearch />
                            </Link>
                            <Link to='/' className="nav_icon">
                                <FaRegPlusSquare />
                            </Link>
                            <Link to='/' className="nav_icon">
                                <FaFacebookMessenger />
                            </Link>
                            <Link to='/' className="nav_icon">
                                <FaRegUser />
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer