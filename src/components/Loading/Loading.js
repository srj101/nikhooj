import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./loading.css";

const Loading = ({ content }) => {
  return (
    <div className="loading-spinner">
      <LoadingOutlined style={{ fontSize: 24 }} spin />
      <div>{content && content}</div>
    </div>
  );
};

export default Loading;
