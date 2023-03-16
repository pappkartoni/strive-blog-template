import React, { useEffect, useState } from "react";
import { Button, Container, Image, Modal } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import BlogComment from "./BlogComment";
import NewBlogComment from "./NewBlogComment";
import "./styles.css";

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [image, setImage] = useState(null);
  console.log(params)

  const getBlogpost = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_BE_DEV_URL
      const res = await fetch(`${apiUrl}/blogposts/${id}`)
      if (res.ok) {
        const data = await res.json()
        setBlog(data)
        setLoading(false)
        console.log(blog)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const postImage = async (image) => {
    
    const formData = new FormData();
    formData.append("cover", image);
    try {
      const apiUrl = process.env.REACT_APP_BE_DEV_URL
      let res = await fetch(
        `${apiUrl}/blogposts/${params.id}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        console.log("Image Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_DEV_URL
      let res = await fetch(`${apiUrl}/blogposts/${params.id}/pdf`)
      console.log(res)

      if (res.ok) {
        window.location = (res.url)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postImage(image)
  } 
  useEffect(() => {
    const { id } = params;
    getBlogpost(id)
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            <Button
              className="mt-2"
              variant="primary"
              onClick={handleClose}
              type="submit"
            >
              Post Image
            </Button>
          </form>
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
          <div>
            <Button
              className="mt-2"
              variant="primary"
              onClick={downloadPDF}
              type="button"
              >
                DOWNLOAD
              </Button>
          </div>
          {blog.comments && blog.comments.map(c => 
            <BlogComment key={c._id} {...c} />
          )}
          <NewBlogComment id={params.id}/>
        </Container>
      </div>
    );
  }
};

export default Blog;
