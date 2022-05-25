import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../MetaData";
import Loading from "../../../components/Loading/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import { Container, Row, Col } from "react-bootstrap";
import { logout } from "../../../actions/userActions";
import { useAlert } from "react-alert";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const logoutUser = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
  };
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [location, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <Container>
              <Row>
                <Col
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  sm={{ span: 10, offset: 1 }}
                  xs={{ span: 10, offset: 1 }}
                >
                  <div>
                    <h1>My Profile</h1>
                    <Link to="/me/update">Edit Profile</Link>
                  </div>
                  <div>
                    <div>
                      <h4>Full Name</h4>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h4 onClick={logoutUser} style={{ cursor: "pointer" }}>
                        Logout
                      </h4>
                    </div>
                    <div></div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProfilePage;
