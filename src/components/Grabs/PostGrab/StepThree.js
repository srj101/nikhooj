import { Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { React, useContext, useEffect, useState } from "react";
import { GrabPostDispatchContext } from "./postGrabContext";
import { GrabPostContext } from "./postGrabContext";
import { Form, Typography, Input } from "antd";
const { Title } = Typography;
const StepThree = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState(grabConfirmDetails.images);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });

    if (images) {
      console.log(images);
      setGrabDetails({
        ...grabConfirmDetails,
        images: images,
      });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
