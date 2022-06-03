import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const AdvancedSearch = () => {
  return (
    <div className="advanced_search_wrapper">
      <Container>
        <Row>
          {/* <Col lg={3} md={2} sm={1} xs={1} style={{textAlign:"center"}}>Ads left</Col> */}

          <Col
            lg={{ span: 6, offset: 3 }}
            md={{ span: 8, offset: 2 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
          >
            Advanced Search Settings here <br />
            + Select location <br />
            + Select range <br />
            + Select Category <br />
            + Select address <br />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdvancedSearch;
