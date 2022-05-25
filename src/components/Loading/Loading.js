import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-spinner">
      <LoadingOutlined style={{ fontSize: 24 }} spin />
    </div>
  );
};

export default Loading;
