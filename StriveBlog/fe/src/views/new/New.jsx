import React, {useCallback, useEffect, useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

const NewBlogPost = props => {
  const [text, setText] = useState("");
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:5050/blogPosts', {
        method: 'POST',
        body: JSON.stringify({
          category: "Daje",
          title: "AAAA,",
          cover: "http://url.com/",
          readTime: {
            value: 2,
            unit: "min"
          },
          author: {
            name: "Peppino",
            avatar: "http://url.com"
          },
          content: "Prova di post yeah"
        }),
        headers: {
          'Content-type': 'application/json',
        }
      })
      setLoading(false)
      const data = await res.json();

    } catch(e){
      setError(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPosts()
  }

  const handleChange = useCallback(value => {
    setText(value);
  });


  return (
    <Container className="new-blog-container" onSubmit={handleSubmit}>
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3" >
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={text} onChange={handleChange} className="new-blog-content" />
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
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
