import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../MetaData";
import Loading from "../../../components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import { Container, Row, Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, PageHeader, Card } from "antd";
import { loadUserPosts } from "../../../actions/userActions";
const { Meta } = Card;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const {
    posts,
    error,
    loading: postsLoading,
  } = useSelector((state) => state.userPosts);
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [location, isAuthenticated]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (user) {
      dispatch(loadUserPosts());
    }
  }, [error, alert, dispatch, user]);

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
                  <div className="profile_wrapper">
                    <PageHeader
                      className="site-page-header-responsive"
                      onBack={() => navigate("/")}
                      title="Profile"
                      subTitle={`${user?.name}'s profile`}
                    />
                    <div className="user_bio">
                      <div className="user_dp">
                        {user?.dp?.url ? (
                          <Avatar src={user?.dp.url} />
                        ) : (
                          <Avatar icon={<UserOutlined />} />
                        )}
                      </div>
                      <div className="userName">{user?.name}</div>
                      <div className="userEmail">{user?.email}</div>
                      <div className="userLevel">Level {user?.level}</div>
                    </div>
                    <div className="userPosts">
                      <Row>
                        {postsLoading ? (
                          <Loading />
                        ) : (
                          <>
                            {posts.length > 0
                              ? posts.map((post, idx) => (
                                  <Col xs={12} sm={12} lg={6} md={6} key={idx}>
                                    <div
                                      className="userPost"
                                      style={{ marginBottom: "25px" }}
                                    >
                                      <Card
                                        hoverable
                                        cover={
                                          <img
                                            alt={post.name}
                                            src={post.images[0].url}
                                          />
                                        }
                                      >
                                        <Meta
                                          title={post.name}
                                          description={post.location.address}
                                        />
                                      </Card>
                                    </div>
                                  </Col>
                                ))
                              : `User Does not have any posts`}
                          </>
                        )}
                      </Row>
                    </div>
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
