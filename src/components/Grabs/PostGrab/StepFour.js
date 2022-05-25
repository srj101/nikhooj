import React, { useContext, useEffect, useState } from "react";
import { Map, Draggable } from "pigeon-maps";
import markerImage from "./marker.png";
import { Form, Input } from "antd";
import { GrabPostDispatchContext } from "./postGrabContext";
import { GrabPostContext } from "./postGrabContext";
import { Typography } from "antd";
const MAPTILER_ACCESS_TOKEN = "8b2AzvDoDft3Fmi9Ur7D";
const MAP_ID = "basic";
const StepFour = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);
  const mapTiler = (x, y, z, dpr) => {
    return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
      dpr >= 2 ? "@2x" : ""
    }.png?key=${MAPTILER_ACCESS_TOKEN}`;
  };
  const [anchor, setAnchor] = useState([23.8768944, 90.3179662]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState();
  const handleAnchorChange = (val) => {
    setAnchor(val);
  };
  useEffect(() => {
    setGrabDetails({
      ...grabConfirmDetails,
      location: [anchor[1], anchor[0]],
    });
    if (phone && address) {
      if (phone.length < 16) {
        setGrabDetails({ ...grabConfirmDetails, navEnabled: true });
      } else {
        setGrabDetails({ ...grabConfirmDetails, navEnabled: false });
      }
    }
  }, [anchor, phone, address]);

  return (
    <div>
      <Typography.Title className="text-center">
        Where did you find this?
      </Typography.Title>
      <Map
        provider={mapTiler}
        height={300}
        defaultCenter={[23.8803099, 90.3145254]}
        defaultZoom={14}
      >
        <Draggable anchor={anchor} onDragEnd={handleAnchorChange}>
          <img width={40} height={40} src={markerImage} alt="marker image" />
        </Draggable>
      </Map>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please provide a phone",
          },
          {
            max: 15,
            message: "Incorrect length for a phone number",
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setPhone(e.target.value);
            setGrabDetails({ ...grabConfirmDetails, phone: e.target.value });
          }}
          placeholder="Phone"
        />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: "Please type an address",
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setAddress(e.target.value);
            setGrabDetails({ ...grabConfirmDetails, address: e.target.value });
          }}
          placeholder="Address"
        />
      </Form.Item>
    </div>
  );
};

export default StepFour;
