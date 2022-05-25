import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import Multistep from "react-multistep";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import "./PostGrab.css";
import ConfirmStep from "./ConfirmStep";
import { GrabPostContext, GrabPostDispatchContext } from "./postGrabContext";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Steps } from "antd";
import { postSingleGrab } from "../../../actions/grabActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
const { Step } = Steps;

const PostGrab = () => {
  const setGrabDetails = useContext(GrabPostDispatchContext);
  const grabConfirmDetails = useContext(GrabPostContext);
  const alert = useAlert();
  const navigate = useNavigate();
  const { grab, loading, error } = useSelector((state) => state.postedGrab);
  const dispatch = useDispatch();
  const steps = [
    { name: "StepOne", component: <StepOne /> },
    { name: "StepTwo", component: <StepTwo /> },
    { name: "StepThree", component: <StepThree /> },
    { name: "StepFour", component: <StepFour /> },
    { name: "StepFive", component: <ConfirmStep /> },
  ];

  const [stepCount, setStepCount] = useState(0);
  const handleNextStep = () => {
    if (stepCount < 4) {
      setStepCount(stepCount + 1);
    }
  };

  const handlePrevStep = () => {
    if (stepCount > 0) {
      setStepCount(stepCount - 1);
    }
  };

  useEffect(() => {
    setGrabDetails({ ...grabConfirmDetails, step: stepCount });
  }, [stepCount]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error]);

  const handlePostGrab = () => {
    dispatch(postSingleGrab(grabConfirmDetails));
    if (grab) {
      alert.success("posted! Holy shitttt!");
      if (!loading) {
        navigate("/");
      }
    }
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
                title="Info"
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
                title="Location"
                icon={<SolutionOutlined />}
              />
              <Step
                status={
                  grabConfirmDetails.step < 4
                    ? `wait`
                    : grabConfirmDetails.step === 4
                    ? `process`
                    : `finish`
                }
                title="Confirm!!!"
                icon={<SmileOutlined />}
              />
            </Steps>
            <Form name="postGrab" className="postAgrabForm">
              <Multistep
                activeStep={stepCount}
                showNavigation={false}
                steps={steps}
              />
            </Form>
            {grabConfirmDetails.step === 4 ? (
              <div className="nextPreviosButton">
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
                {grabConfirmDetails.step > 0 ? (
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
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostGrab;
