import React, { useContext, useEffect, useState } from "react";
import { Form, Button } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import Multistep from "react-multistep";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "./PostGrab.css";
import ConfirmStep from "./ConfirmStep";
import {
  GrabPostContext,
  GrabPostDispatchContext,
} from "../../../Contexts/postGrabContext";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Loading from "../../Loading/Loading";
import { Steps } from "antd";
import { postSingleGrab } from "../../../actions/grabActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import StepZero from "./StepZero";
const { Step } = Steps;

const PostGrab = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);
  const alert = useAlert();
  const navigate = useNavigate();
  const { grab, loading, error } = useSelector((state) => state.postedGrab);
  const dispatch = useDispatch();
  const steps = [
    { name: "StepZero", component: <StepZero /> },
    { name: "StepOne", component: <StepOne /> },
    { name: "StepTwo", component: <StepTwo /> },
    { name: "StepThree", component: <StepThree /> },
    { name: "StepFour", component: <StepFour /> },
    { name: "StepFive", component: <ConfirmStep /> },
  ];

  const handleNextStep = () => {
    if (grabConfirmDetails.step < 5) {
      setGrabDetails({
        ...grabConfirmDetails,
        step: grabConfirmDetails.step + 1,
      });
    }
  };

  const handlePrevStep = () => {
    if (grabConfirmDetails.step > 0) {
      setGrabDetails({
        ...grabConfirmDetails,
        step: grabConfirmDetails.step - 1,
      });
    }
  };

  useEffect(() => {
    if (error && loading === false) {
      alert.error(error);
    }
  }, [error]);

  const handlePostGrab = () => {
    dispatch(postSingleGrab(grabConfirmDetails));

    alert.success("Processing...");

    navigate("/");
  };

  return (
    <div className="postGrabs">
      <Container>
        <Row>
          <Col
            lg={{ span: 6, offset: 3 }}
            md={{ span: 8, offset: 2 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                <Steps
                  responsive={false}
                  direction="horizontal"
                  labelPlacement="horizontal"
                >
                  <Step
                    status={
                      grabConfirmDetails.step < 1
                        ? `wait`
                        : grabConfirmDetails.step === 0
                        ? `process`
                        : `finish`
                    }
                    icon={<SettingOutlined />}
                  />
                  <Step
                    status={
                      grabConfirmDetails.step < 2
                        ? `wait`
                        : grabConfirmDetails.step === 1
                        ? `process`
                        : `finish`
                    }
                    icon={<UserOutlined />}
                  />

                  <Step
                    status={
                      grabConfirmDetails.step < 3
                        ? `wait`
                        : grabConfirmDetails.step === 2
                        ? `process`
                        : `finish`
                    }
                    icon={<SolutionOutlined />}
                  />
                  <Step
                    status={
                      grabConfirmDetails.step < 5
                        ? `wait`
                        : grabConfirmDetails.step === 5
                        ? `process`
                        : `finish`
                    }
                    icon={<SmileOutlined />}
                  />
                </Steps>
                <Form name="postGrab" className="postAgrabForm">
                  <Multistep
                    activeStep={grabConfirmDetails.step}
                    showNavigation={false}
                    steps={steps}
                  />
                </Form>

                <>
                  {grabConfirmDetails.step === 5 ? (
                    <div className="nextPreviosButton">
                      {grabConfirmDetails.step > 1 ? (
                        <button onClick={handlePrevStep}>Prev</button>
                      ) : (
                        <></>
                      )}
                      <Button
                        type="submit"
                        disabled={loading}
                        onClick={handlePostGrab}
                      >
                        Post!
                      </Button>
                    </div>
                  ) : (
                    <div className="nextPreviosButton">
                      {grabConfirmDetails.step > 1 ? (
                        <button onClick={handlePrevStep}>Prev</button>
                      ) : (
                        <></>
                      )}
                      {grabConfirmDetails.navEnabled ? (
                        <button onClick={handleNextStep}>Next</button>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostGrab;
