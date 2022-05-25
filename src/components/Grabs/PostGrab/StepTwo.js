import React, { useContext, useEffect, useState } from "react";
import { Form, Input } from "antd";
import { Typography } from "antd";
import { GrabPostDispatchContext } from "./postGrabContext";
import { GrabPostContext } from "./postGrabContext";
const { TextArea } = Input;
const { Title } = Typography;

const StepTwo = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);

  const [description, setDescription] = useState("");

  useEffect(() => {
    if (grabConfirmDetails.description.length > 0 && description.length < 250) {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: true });
    } else {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: false });
    }
  }, [grabConfirmDetails.description.length]);

  return (
    <div>
      <Form.Item name="description">
        <Title style={{ textAlign: "center" }} level={2}>
          Please provide a description
        </Title>
        <TextArea
          onChange={(e) => {
            setGrabDetails({
              ...grabConfirmDetails,
              description: e.target.value,
            });
            setDescription(e.target.value);
          }}
          rows={4}
          maxLength={250}
          value={grabConfirmDetails?.description}
          placeholder="Describe your grab"
        ></TextArea>
      </Form.Item>
    </div>
  );
};

export default StepTwo;
