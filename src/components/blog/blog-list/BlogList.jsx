import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [allPosts, setAllPosts] = useState([])

  const getAllBlogPosts = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_DEV_URL
      const res = await fetch(`${apiUrl}/blogposts`)
      if (res.ok) {
        const data = await res.json()
        setAllPosts(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBlogPosts()
  }, [])

  return (
    <Row>
      {allPosts.reverse().map((post) => (
        <Col
          md={4}
          key={post.uuid}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem  {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
