import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = (props) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get("accessToken")) {
      localStorage.setItem("token", searchParams.get("accessToken"))
      navigate("/home")
    }
    if (!localStorage.getItem("token")) navigate("/")
  }, [navigate, searchParams])

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Epicode Blog!</h1>
      {localStorage.getItem("token") && <BlogList />}
    </Container>
  );
};

export default Home;
