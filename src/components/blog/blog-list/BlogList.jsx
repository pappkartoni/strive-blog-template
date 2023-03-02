import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [allPosts, setAllPosts] = useState([])

  const getAllBlogPosts = async () => {
    try {
      const res = await fetch("http://localhost:3420/blogposts")
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
