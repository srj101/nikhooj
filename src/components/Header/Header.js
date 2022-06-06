import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "antd";
import { FaHome, FaSearchLocation, FaRegUser } from "react-icons/fa";
import logo from "./logo.png";
import "./Header.css";
import MetaData from "../../Layout/MetaData";
import { getAllGrabs } from "../../actions/grabActions";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../actions/userActions";
import { googleLogout } from "@react-oauth/google";
import { useAlert } from "react-alert";
const { Search } = Input;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const isSearchPage = location.pathname === "/search";
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isSearchPage]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    googleLogout();
    alert.success("Logout Successfully");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="header_Area">
      {isSearchPage ? (
        <MetaData title="NIKHOOJ | Search" />
      ) : (
        <MetaData title="NIKHOOJ | Home" />
      )}
      <div className="site_header">
        {/*-- ---------Logo--------- -- */}
        <div className="site_logo">
          <img src={logo} alt="Nikhooj logo" />
        </div>
        {/*-----------Search-----------*/}
        <div
          className="site_search"
          style={{ display: isSearchPage ? "block" : "none" }}
        >
          <Search
            placeholder="Search Here"
            allowClear
            onSearch={(value) =>
              dispatch(getAllGrabs(value.target.value, 1, ""))
            }
          />
        </div>
        {/*-----------Home,Messege,CreateNewPost,Notification,Profile-----------*/}
        <div className="site_header_navigation">
          <div className="nav_icon">
            <Link to="/">
              <FaHome />
            </Link>
          </div>
          <div className="nav_icon">
            <Link to="/advanced_search">
              <FaSearchLocation />
            </Link>
          </div>
          <div className="nav_icon">
            <Link to="/profile">
              <FaRegUser />
            </Link>
          </div>
          <div className="nav_icon">
            <Link to="/" onClick={handleLogout}>
              <LogoutOutlined />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
