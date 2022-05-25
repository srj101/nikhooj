import { Input, Radio, Space } from "antd";
import { useState } from "react";

const Report = () => {
  const [value, setValue] = useState("Innaprropriate");
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio value={`Innaprropriate`}>Innaprropriate</Radio>
        <Radio value={`Spam`}>Spam</Radio>
        <Radio value={`Nudity`}>Nudity</Radio>
        <Radio value={`Something Else`}>Something Else...</Radio>
      </Space>
    </Radio.Group>
  );
};

export default Report;
