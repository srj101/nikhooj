import React, { useEffect, useRef, useState } from "react";
import "./Grab.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { GiHearts } from "react-icons/gi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FaHandSparkles, FaHandMiddleFinger } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Modal, Tag } from "antd";
import { timeSince } from "../SingleGrabPage/countPostTime";
import { useDispatch, useSelector } from "react-redux";
import { likeAGrab } from "../../../actions/grabActions";
import { useAlert } from "react-alert";
import Loading from "../../Loading/Loading";
import { Map, Marker } from "pigeon-maps";
import Report from "./Report";
const { confirm } = Modal;
const MAPTILER_ACCESS_TOKEN = "8b2AzvDoDft3Fmi9Ur7D";
const MAP_ID = "basic";

const Grab = ({ grab }) => {
  const dispatch = useDispatch();
  const mapTiler = (x, y, z, dpr) => {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  };

  const {
    _id,
    images,
    name,
    address,
    postedBy,
    createdAt,
    phone,
    location,
    category,
    heartedBy,
  } = grab;

  // let swapper = location.coordinates[0];
  // location.coordinates[0] = location.coordinates[1];
  // location.coordinates[1] = swapper;

  const { user, loading: userLoading } = useSelector((state) => state.user);

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
  const heartBtn = useRef(null);
  const handleHeartClick = () => {
    dispatch(likeAGrab(_id));
    if (heartBtn.current.style.color === "red") {
      heartBtn.current.style.color = "black";
    } else if (heartBtn.current.style.color === "black") {
      heartBtn.current.style.color = "red";
    }
  };

  const handleReportClick = () => {
    confirm({
      title: "Do you want to Report?",
      icon: <ExclamationCircleOutlined />,
      content: <Report />,

      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },

      onCancel() {},
    });
  };

  return (
    <div className="Grab">
      <div className="grab__header">
        <Link to="/profile" className="userInfo">
          <div className="userProfileDP">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
          </div>
          <div className="postedBy">
            <h4>{postedBy.name}</h4>
          </div>
        </Link>
        <div className="grabMenu">
          <p onClick={handleReportClick}>...</p>
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
                  heartedBy && heartedBy.includes(user._id) ? `red` : `black`,
              }}
            >
              <GiHearts onClick={handleHeartClick} />
            </div>
          )}
        </div>
        <div className="claimGrab" onClick={handleClaimGrab}>
          <span>Claim!</span> <FaHandSparkles />
        </div>
      </div>
      <div className="grab__footer">
        <div className="grab_name">
          <b>
            <em>{name}</em>
          </b>
        </div>
        <div className="grab_address">
          <GoLocation />
          <span>{address}</span>
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
