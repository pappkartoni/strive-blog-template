import { Card } from "react-bootstrap"

const BlogComment = (props) => {
    return (
        <Card className="mt-3 p-3">
            <Card.Title>{props.name}</Card.Title>
            <Card.Body>{props.text}</Card.Body>
        </Card>
    )
}

export default BlogComment