import React, { useEffect, useState } from "react";
import Grab from "./Grab/Grab";
import Pagination from "react-js-pagination";
// import InfiniteScroll from 'react-infinite-scroller';
import "./grabContainer.css";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllGrabs } from "../../actions/grabActions";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

const Grabcontainer = () => {
  const { keyword } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    grabs,
    loading,
    error,
    grabsCount,
    resultPerPage,
    filteredGrabsCount,
  } = useSelector((state) => state.grabs);

  const [currentPage, setCurrentPage] = useState(1);

  let count = filteredGrabsCount;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getAllGrabs(keyword, currentPage));
  }, [error, alert, keyword, currentPage, dispatch]);

  return (
    <div className="grabContainer">
      <Container>
        <Row>
          {/* <Col lg={3} md={2} sm={1} xs={1} style={{textAlign:"center"}}>Ads left</Col> */}

          <Col
            lg={{ span: 6, offset: 3 }}
            md={{ span: 8, offset: 2 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
          >
            {/* <InfiniteScroll
                pageStart={0}
                loadMore={loadMoreGrabs} 
                hasMore={loaded < count}
                loader={<h4>Loading...</h4>}
              >
                {grabs.map((grab,i) => <Grab key={i} grab={grab}/>)}
              </InfiniteScroll> */}
            {loading ? (
              <Loading />
            ) : (
              grabs.map((grab, i) => <Grab key={i} grab={grab} />)
            )}

            {resultPerPage < count ? (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={grabsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            ) : (
              <></>
            )}
          </Col>

          {/* <Col lg={3} md={2} sm={1} xs={1} style={{textAlign:"center"}}> Ads right</Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default Grabcontainer;
