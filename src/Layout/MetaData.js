import React from "react";
import Helmet from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Nikhooj App | If you help people , Allah you help you back" />
    </Helmet>
  );
};

export default MetaData;