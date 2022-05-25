import { Typography } from "antd";
import React, { useContext } from "react";
import { GrabPostContext } from "./postGrabContext";

const ConfirmStep = () => {
  const grabConfirmDetails = useContext(GrabPostContext);
  console.log(grabConfirmDetails);
  return (
    <div>
      <Typography.Title className="text-center">
        Please Confrim Details...
      </Typography.Title>
      <div className="grabConfirmDetails">
        Name : {grabConfirmDetails?.name} <br />
        Categories: [ {grabConfirmDetails?.category?.map((c) => c)} ]
        <br />
        Images: {grabConfirmDetails?.images.length} are {`Attached!`} <br />
        location: [{grabConfirmDetails?.location[0]},
        {grabConfirmDetails?.location[1]}] <br />
        Phone: {grabConfirmDetails.phone} <br />
        Address: {grabConfirmDetails.address}
      </div>
    </div>
  );
};

export default ConfirmStep;
