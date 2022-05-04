import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Input } from 'antd';
import { FaHome, FaRegCompass, FaRegUser } from 'react-icons/fa';
import './Header.css'
const { Search } = Input;

const Header = () => {
    const location = useLocation();
    const isSearchPage = location.pathname.includes('search');
    
    return (
        <div className='header_Area'>
            <div className='site_header'>
                {/*-- ---------Logo--------- -- */}
                <div className="site_logo">
                    <img src="https://i.ibb.co/1rCSzcW/cooltext410097514975534.png" alt="" />
                </div>
                {/*-----------Search-----------*/}
                <div className="site_search" style={{display: isSearchPage? "block": "none"}}>
                    <Search placeholder="Search Here" allowClear />
                </div>
                {/*-----------Home,Messege,CreateNewPost,Notification,Profile-----------*/}
                <div className="site_header_navigation"  style={{display: isSearchPage? "none": "flex"}}>
                    <div className="nav_icon">
                        <Link to='/'><FaHome /></Link>
                    </div>
                    <div className="nav_icon">
                        <Link to='/'><FaRegCompass /></Link>
                    </div>
                    <div className="nav_icon">
                        <Link to='/'><FaRegUser /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header