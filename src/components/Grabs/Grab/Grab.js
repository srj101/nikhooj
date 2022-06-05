import React, { useEffect, useRef, useState } from "react";
import "./Grab.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { GiHearts } from "react-icons/gi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FaHandSparkles, FaHandMiddleFinger } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Modal, Tag, Radio, Space } from "antd";
import { timeSince } from "../SingleGrabPage/countPostTime";
import { useDispatch, useSelector } from "react-redux";
import {
  claimAGrab,
  likeAGrab,
  reportAGrab,
} from "../../../actions/grabActions";
import { useAlert } from "react-alert";
import Loading from "../../Loading/Loading";
import { Map, Marker } from "pigeon-maps";
import Report from "./Report";
import { likesBy } from "../../../utils/likeList";
const { confirm } = Modal;
const MAPTILER_ACCESS_TOKEN = "8b2AzvDoDft3Fmi9Ur7D";
const MAP_ID = "basic";

const Grab = ({ grab }) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const mapTiler = (x, y, z, dpr) => {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  };

  const {
    _id,
    images,
    name,
    postedBy,
    createdAt,
    phone,
    location,
    category,
    type,
    heartedBy,
  } = grab;

  // let swapper = location.coordinates[0];
  // location.coordinates[0] = location.coordinates[1];
  // location.coordinates[1] = swapper;

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { error: heartError, loading: heartLoading } = useSelector(
    (state) => state.hearts
  );

  useEffect(() => {
    if (heartError) {
      alert.error(heartError);
    }
  }, [heartError, alert, dispatch]);

  const settings = {
    dots: false,
    dotsClass: "grab-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleKnockGrab = () => {
    confirm({
      title: "Contact",
      icon: <ExclamationCircleOutlined />,
      content: phone,

      onOk() {
        dispatch(
          claimAGrab({
            comment:
              type && type === "lost"
                ? `${user && user.name} knocks`
                : `${user && user.name} claims ${name && name}`,
            type: type && type === "lost" ? `knock` : `claim`,
            grab_id: _id && _id,
            user_id: user && user._id,
          })
        );
        if (heartLoading === false && !heartError) {
          alert.success(`User will be notified!`);
        }
      },

      onCancel() {},
    });
  };

  const handleClaimGrab = () => {
    confirm({
      title: "Contact",
      icon: <ExclamationCircleOutlined />,
      content: phone,

      onOk() {
        dispatch(
          claimAGrab({
            comment:
              type && type === "lost"
                ? `${user && user.name} knocks`
                : `${user && user.name} claims ${name && name}`,
            type: type && type === "lost" ? `knock` : `claim`,
            grab_id: _id && _id,
            user_id: user && user._id,
          })
        );
        if (heartLoading === false && !heartError) {
          alert.success(`Claim request sent!`);
        }
      },

      onCancel() {},
    });
  };
  const heartBtn = useRef(null);
  const handleHeartClick = () => {
    dispatch(likeAGrab(_id));
    if (heartBtn.current.style.color === "red") {
      heartBtn.current.style.color = "black";
    } else if (heartBtn.current.style.color === "black") {
      heartBtn.current.style.color = "red";
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const submitReport = () => {
    dispatch(
      reportAGrab({
        name: "Grab Report",
        comment: value,
        grab_id: _id && _id,
        user_id: user && user._id,
      })
    );

    setVisible(false);
    if (heartLoading === false && !heartError) {
      alert.success(`Reported!`);
    }
  };

  const [value, setValue] = useState("Innaprropriate");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="Grab">
      <div className="grab__header">
        <Link to={`/profile/${postedBy._id}`} className="userInfo">
          <div className="userProfileDP">
            <img
              src={
                postedBy.dp.url
                  ? postedBy.dp.url
                  : `https://www.w3schools.com/howto/img_avatar.png`
              }
              alt="Profile Picture"
            />
          </div>
          <div className="postedBy">
            <h4>{postedBy.name}</h4>
          </div>
        </Link>
        <div className="grabMenu">
          {heartLoading ? (
            `w...`
          ) : (
            <>
              <p onClick={showModal}>...</p>
              <Modal
                title="Modal"
                visible={visible}
                onOk={submitReport}
                okText="Report"
                cancelText="Cancel"
                onCancel={hideModal}
              >
                <Radio.Group onChange={onChange} value={value}>
                  <Space direction="vertical">
                    <Radio value={`Innaprropriate`}>Innaprropriate</Radio>
                    <Radio value={`Spam`}>Spam</Radio>
                    <Radio value={`Nudity`}>Nudity</Radio>
                    <Radio value={`Something Else`}>Something Else...</Radio>
                  </Space>
                </Radio.Group>
              </Modal>
            </>
          )}
        </div>
      </div>
      {images.length > 0 ? (
        <div className="grabImages">
          <Swiper {...settings}>
            {images.map((grabImage, i) => (
              <SwiperSlide
                EffectCube
                Zoom
                Lazy
                Parallax
                slidesPerView={1}
                Mousewheel
              >
                <Link to={`/grab/${_id}`} className="grabImage">
                  <img key={i} src={grabImage.url} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // <Map
        //   provider={mapTiler}
        //   height={300}
        //   defaultCenter={[0, 0]}
        //   defaultZoom={14}
        // >
        //   <Marker color="black" width={40} anchor={[0, 0]} />
        // </Map>
        `Map comes here`
      )}

      <div className="grab_navs__container">
        <div className="nav_icons">
          {userLoading ? (
            `Loadign...`
          ) : (
            <div
              className="grabHearts"
              ref={heartBtn}
              style={{
                color:
                  heartedBy &&
                  Boolean(heartedBy.find((l) => l._id === user._id))
                    ? `red`
                    : `black`,
              }}
            >
              <GiHearts onClick={handleHeartClick} />
            </div>
          )}
          <div className="likedByUsers">{likesBy(heartedBy || [])}</div>
        </div>
        {type === "lost" ? (
          <div className="knockGrab" onClick={handleKnockGrab}>
            <span>Knock!</span> <FaHandSparkles />
          </div>
        ) : (
          <div className="claimGrab" onClick={handleClaimGrab}>
            <span>Claim!</span> <FaHandSparkles />
          </div>
        )}
      </div>
      <div className="grab__footer">
        <div className="grab_name">
          <b>
            <em>
              {type === "lost" ? `I have lost ${name}` : `I have found ${name}`}
            </em>
          </b>
        </div>
        <div className="grab_address">
          <GoLocation />
          <span>{location.address}</span>
        </div>
        <div className="grab_categories">
          {category.map((cat) => (
            <Tag color="#87d068">{cat}</Tag>
          ))}
        </div>
        <div className="postedAgo">
          Posted {timeSince(new Date(createdAt))} Ago
        </div>
      </div>
    </div>
  );
};

export default Grab;
