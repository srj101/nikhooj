import { Tag } from "antd";
import React, { useContext } from "react";
import { GrabPostContext } from "../../../Contexts/postGrabContext";
import { Descriptions, Badge } from "antd";
import { useSelector } from "react-redux";

const ConfirmStep = () => {
  const grabConfirmDetails = useContext(GrabPostContext);
  const { loading } = useSelector((state) => state.postedGrab);
  console.log(grabConfirmDetails);
  return (
    <>
      <div>
        <div className="grabConfirmDetails">
          <Descriptions title="সবকিছু ঠিকঠাক?" layout="vertical" bordered>
            <Descriptions.Item label="Name" span={3}>
              <Badge color="lime" text={grabConfirmDetails?.name} />
            </Descriptions.Item>
            <Descriptions.Item
              label="Categories"
              span={grabConfirmDetails.category.length}
            >
              {grabConfirmDetails?.category?.map((cat) => (
                <Tag color="#87d068">{cat}</Tag>
              ))}
            </Descriptions.Item>
            <Descriptions.Item
              label="Images"
              span={grabConfirmDetails.images.length}
            >
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
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              <b>{grabConfirmDetails.phone} </b>
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              <b>{grabConfirmDetails.address} </b>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
};

export default ConfirmStep;
