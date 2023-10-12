import React, {useState, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import {BeatLoader} from "react-spinners";

const BlogList = props => {
  const [posts, setPosts] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5050/blogPosts")
      const data = await res.json()
      setPosts(data)
      setIsLoading(false)

    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  console.log(posts.posts)
  console.log(loading)

  return (
    <Row>
      {error && <h1>Errore nel caricamento</h1>}
      {loading && !error && (
          <BeatLoader
              loading={loading}
              size={150}
              aria-label='Loading Spinner'
          />
      )}
      {!loading && posts.posts && posts.posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
      //<></>
  );
};

export default BlogList;
