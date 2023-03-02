import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"

const NewBlogComment = (props) => {
    const [comment, setComment] = useState({
        name: "",
        text: ""
    })

    const postComment = async () => {
        try {
            const res = await fetch(`http://localhost:3420/blogposts/${props.id}/comments`, {
                method: "POST",
                body: JSON.stringify(comment),
                headers: new Headers({
                    "Content-Type": "application/json"
                  })
            })
            if (res.ok) {
                setComment({
                    name: "",
                    text: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        console.log(comment)
        e.preventDefault()
        postComment()
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={comment.name} onChange={e => setComment({...comment, name: e.target.value})}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control value={comment.text} onChange={e => setComment({...comment, text: e.target.value})}></Form.Control>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default NewBlogComment