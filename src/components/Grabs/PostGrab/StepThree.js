import { PlusOutlined } from "@ant-design/icons";
import { React, useContext, useEffect, useState } from "react";
import { GrabPostDispatchContext } from "../../../Contexts/postGrabContext";
import { GrabPostContext } from "../../../Contexts/postGrabContext";
import { Form, Typography, Input } from "antd";
const { Title } = Typography;
const StepThree = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setGrabDetails({
            ...grabConfirmDetails,
            images: [...grabConfirmDetails.images, reader.result],
          });
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (grabConfirmDetails.images.length > 0) {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: true });
    } else {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: false });
    }
  }, [grabConfirmDetails.images.length]);

  return (
    <>
      <Title style={{ textAlign: "center" }} level={2}>
        Please Add some Images
      </Title>
      <Form.Item name="images">
        <Input
          type="file"
          name="grab"
          accept="image/*"
          onChange={handleChange}
          multiple
        />

        {grabConfirmDetails.images.map((image, index) => (
          <img
            key={index}
            width={50}
            height={50}
            style={{
              border: "1px solid #000",
              margin: "2px",
              objectFit: "contain",
              padding: "2px",
            }}
            src={image}
            alt="Product Preview"
          />
        ))}
      </Form.Item>
    </>
  );
};

export default StepThree;
