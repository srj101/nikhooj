import React, { useContext, useEffect, useState } from "react";
import { Map, Draggable } from "pigeon-maps";
import { Form, Input } from "antd";
import { GrabPostDispatchContext } from "../../../Contexts/postGrabContext";
import { GrabPostContext } from "../../../Contexts/postGrabContext";
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
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zoom, setZoom] = useState(14);
  const [center, setCenter] = useState([23.8768944, 90.3179662]);
  const handleAnchorChange = (val) => {
    setCenter(val);
    setGrabDetails({
      ...grabConfirmDetails,
      location: [val[1], val[0]],
    });
  };
  useEffect(() => {
    if (
      grabConfirmDetails.phone.length < 18 &&
      grabConfirmDetails.phone.length > 10 &&
      grabConfirmDetails.address.length > 5 &&
      grabConfirmDetails.address.length < 200
    ) {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: true });
    } else {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: false });
    }
  }, [phone, address]);

  const handleBoundChange = (val) => {
    setZoom(val.zoom);
    setCenter(val.center);
  };

  return (
    <div>
      <Typography.Title className="text-center">
        {grabConfirmDetails.postType === "found"
          ? `Where did you find this? ?`
          : `Where did you lost this?`}
      </Typography.Title>
      <Map
        provider={mapTiler}
        height={300}
        defaultCenter={grabConfirmDetails.location}
        center={center}
        defaultZoom={zoom}
        onBoundsChanged={handleBoundChange}
        onClick={({ latLng }) =>
          setGrabDetails({
            ...grabConfirmDetails,
            location: [latLng[1], latLng[0]],
          })
        }
      >
        <Draggable anchor={center} onDragEnd={handleAnchorChange}>
          <img
            width={30}
            height={30}
            src={grabConfirmDetails.images[0]}
            alt="marker image"
          />
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
