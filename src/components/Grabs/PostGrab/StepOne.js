import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { Typography } from "antd";
import { categories } from "../../../constants";
import { GrabPostDispatchContext } from "../../../Contexts/postGrabContext";
import { GrabPostContext } from "../../../Contexts/postGrabContext";
const { Title } = Typography;
const { Option } = Select;

const StepOne = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);

  const handleSelectChange = (value) => {
    setCategory(value);
    setGrabDetails({ ...grabConfirmDetails, category: value });
  };

  useEffect(() => {
    if (
      grabConfirmDetails.name.length < 50 &&
      grabConfirmDetails.name.length > 0 &&
      grabConfirmDetails.category.length !== 0
    ) {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: true });
    } else {
      setGrabDetails({ ...grabConfirmDetails, navEnabled: false });
    }
  }, [name, category]);

  return (
    <div>
      <Title style={{ textAlign: "center" }} level={2}>
        {grabConfirmDetails.postType === "found"
          ? `What have you found ?`
          : `What have you lost ?`}
      </Title>
      <Form.Item
        name="GrabName"
        rules={[
          {
            required: true,
            message: "Please do name of your grab",
          },
          {
            max: 50,
            message: "Please name it under 15 letters",
          },
        ]}
      >
        <Input
          onChange={(e) => {
            setName(e.target.value);
            setGrabDetails({ ...grabConfirmDetails, name: e.target.value });
          }}
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name="category"
        rules={[
          {
            required: true,
            message: "Type a Category",
          },
        ]}
      >
        <Select
          mode="tags"
          showArrow
          onChange={handleSelectChange}
          placeholder="Select Relevant Category"
        >
          {categories.map((cat, idx) => (
            <Option value={cat} key={idx}>
              {cat}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default StepOne;
