import React from "react";
import { Col } from "react-bootstrap";
import { Card, Badge } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;
const Post = ({ post, idx }) => {
  return (
    <Col xs={12} sm={12} lg={6} md={6} key={idx}>
      <Badge.Ribbon
        text={post.type === "found" ? `Found` : `Lost`}
        color={post.type === "found" ? `green` : `magenta`}
      >
        <div className="userPost" style={{ marginBottom: "25px" }}>
          <Link to={`/grab/${post._id}`}>
            <Card
              hoverable
              cover={<img alt={post.name} src={post.images[0]?.url} />}
            >
              <Meta title={post.name} description={post.location.address} />
            </Card>
          </Link>
        </div>
      </Badge.Ribbon>
    </Col>
  );
};

export default Post;
