import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("Category1")
  const [author, setAuthor] = useState({})
  const [html, setHTML] = useState(null);

  const navigate = useNavigate()

  const getAuthor = async () => {
    try {
      const apiUrl = process.env.REACT_APP_BE_DEV_URL
      const res = await fetch(`${apiUrl}/authors/88397151-110a-4a5f-b3e7-de19be4e0629`)

      if (res.ok) {
        const authorRes = await res.json()
        setAuthor(authorRes)
        console.log(authorRes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);  

  useEffect(() => {
    getAuthor()
  },[])

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      const content = {
        category: category,
        title: title,
        cover: author.avatar,
        readTime: {
          value: 5,
          unit: "minute"
        },
        author: {
          name: author.name + " " + author.surname,
          avatar: author.avatar
        },
        content: html,
        comments: []
      }

      console.log(content)
      console.log(JSON.stringify(content))
      
      const res = await fetch("http://localhost:3420/blogposts", {
        method: "POST",
        body: JSON.stringify(content),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      })

      if (res.ok) {
        const data = res.json()
        console.log(data)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={submitForm}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control size="lg" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select" onChange={e => setCategory(e.target.value)}>
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
