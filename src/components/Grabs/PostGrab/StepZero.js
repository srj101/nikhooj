import React, { useContext, useEffect, useState } from "react";
import { Form, Input } from "antd";
import { Typography } from "antd";
import { GrabPostDispatchContext } from "../../../Contexts/postGrabContext";
import { GrabPostContext } from "../../../Contexts/postGrabContext";
import "./stepZero.css";
const { Title } = Typography;

const StepZero = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);

  useEffect(() => {
    if (grabConfirmDetails.postType) {
      setGrabDetails({ ...grabConfirmDetails, step: 1 });
    } else {
      setGrabDetails({ ...grabConfirmDetails, step: 0 });
    }
  }, [grabConfirmDetails.postType]);

  const handleFoundPost = () => {
    setGrabDetails({ ...grabConfirmDetails, postType: "found" });
  };

  const handleLostPost = () => {
    setGrabDetails({ ...grabConfirmDetails, postType: "lost" });
  };

  return (
    <div className="step_Zero">
      <Form.Item name="description">
        <Title style={{ textAlign: "center" }} level={2}>
          Select type of your post
        </Title>
        <div className="select_grab_post_type">
          <div className="box shadow" onClick={handleLostPost}>
            <div class="circle"></div>
            <div className="box_content">I've Lost Something...</div>
          </div>
          <div className="box shadow" onClick={handleFoundPost}>
            <div class="circle"></div>
            <div className="box_content">I've Found Something...</div>
          </div>
        </div>
      </Form.Item>
    </div>
  );
};

export default StepZero;
