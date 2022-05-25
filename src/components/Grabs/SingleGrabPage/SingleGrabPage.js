import React, { useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { GiHearts } from "react-icons/gi";
import { ShareSocial } from "react-share-social";
import { FaHandSparkles } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { getSingleGrab, likeAGrab } from "../../../actions/grabActions";
import { timeSince } from "./countPostTime";
import { Container, Row, Col } from "react-bootstrap";
import { Map, Marker } from "pigeon-maps";
import Loading from "../../Loading/Loading";
import { Modal } from "antd";
import "./SingleGrabPage.css";
const { confirm } = Modal;
const MAPTILER_ACCESS_TOKEN = "8b2AzvDoDft3Fmi9Ur7D";
const MAP_ID = "basic";
const SingleGrabPage = () => {
  const mapTiler = (x, y, z, dpr) => {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  };
  const {
    hearted,
    loading: hLoading,
    error: hError,
    heartedByUpdate,
  } = useSelector((state) => state.hearts);

  const heartButton = useRef(null);

  const handleHeartClick = () => {
    dispatch(likeAGrab(_id));
    if (hError) {
      alert.error(hError);
    }
    if (heartButton.current.style.color === "red") {
      heartButton.current.style.color = "black";
    } else if (heartButton.current.style.color === "black") {
      heartButton.current.style.color = "red";
    }
  };
  const dispatch = useDispatch();
  const alert = useAlert();
  const { grab, loading, error } = useSelector((state) => state.singleGrab);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getSingleGrab(id));
  }, [dispatch, alert, error, hError]);

  let {
    name,
    _id,
    location,
    images,
    address,
    phone,
    description,
    category,
    createdAt,
    heartedBy,
  } = grab;

  const handleClaimGrab = () => {
    confirm({
      title: "Contact",
      icon: <ExclamationCircleOutlined />,
      content: phone,

      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },

      onCancel() {},
    });
  };
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="SingleGrabPage_container">
          <div className="map">
            {/** wah keya seen hae */}
            <Map
              provider={mapTiler}
              height={300}
              defaultCenter={[0, 0]}
              defaultZoom={14}
            >
              <Marker color="black" width={40} anchor={[0, 0]} />
            </Map>
          </div>
          <div className="info_container">
            <Container>
              <Row>
                <Col
                  lg={{ span: 6, offset: 3 }}
                  md={{ span: 8, offset: 2 }}
                  sm={{ span: 10, offset: 1 }}
                  xs={{ span: 10, offset: 1 }}
                >
                  <div className="info_container__header">
                    <div className="title">{name}</div>
                    <div className="info_container__header_controls">
                      <div
                        className="grabHearts"
                        ref={heartButton}
                        style={{
                          color:
                            heartedBy && heartedBy.includes(user?._id)
                              ? "red"
                              : "black",
                        }}
                      >
                        <GiHearts onClick={handleHeartClick} />
                      </div>
                      <div className="claimGrab" onClick={handleClaimGrab}>
                        <span>Claim!</span> <FaHandSparkles />
                      </div>
                      <div className="grabShare">
                        <ShareSocial
                          url={`${window.location.href}/grab/${_id}`}
                          socialTypes={[
                            "facebook",
                            "twitter",
                            "reddit",
                            "linkedin",
                          ]}
                        >
                          <FiShare />
                        </ShareSocial>
                      </div>
                    </div>
                  </div>

                  <div className="description">{description}</div>
                  <div>{heartedBy && heartedBy.length} Hearts</div>
                  <div className="postedTime">
                    Posted {timeSince(new Date(createdAt))} Ago
                  </div>
                  <div className="category">{category}</div>
                  <div className="where_I_got_location">{address}</div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGrabPage;
