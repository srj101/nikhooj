import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from 'antd';
import { FaHome, FaRegCompass, FaRegUser } from 'react-icons/fa';
import logo from './logo.png'
import './Header.css'
import MetaData from '../../Layout/MetaData';
const { Search } = Input;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isSearchPage = location.pathname.includes('search');

  useEffect(() => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
  },[isSearchPage])
    
    return (
        <div className='header_Area'>
            {isSearchPage? <MetaData title="NIKHOOJ | Search" />: <MetaData title="NIKHOOJ | Home" />}
            <div className='site_header'>
                {/*-- ---------Logo--------- -- */}
                <div className="site_logo">
                    <img src={logo} alt="Nikhooj logo" />
                </div>
                {/*-----------Search-----------*/}
                <div className="site_search" style={{display: isSearchPage? "block": "none"}}>
                    <Search placeholder="Search Here" allowClear onSearch={(value) => navigate(`/search/${value}`)}/>
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
                        <Link to='/profile'><FaRegUser /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header