import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../MetaData";
import Loading from "../../../components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import "./Profile.css";
import { Container, Row, Col } from "react-bootstrap";
import { useAlert } from "react-alert";
import { PageHeader, Card } from "antd";
import { loadUserPosts } from "../../../actions/userActions";
import Post from "./Post";
import UserBio from "./UserBio";

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
                      onBack={() => navigate(-1)}
                      title="Profile"
                      subTitle={`${user?.name}'s profile`}
                    />
                    <UserBio user={user} />
                    <div className="userPosts">
                      <Row>
                        {postsLoading ? (
                          <Col xs={12} sm={12} lg={6} md={6}>
                            <Loading />
                          </Col>
                        ) : (
                          <>
                            {posts?.length > 0
                              ? posts.map((post, idx) => (
                                  <Post idx={idx} post={post} />
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
