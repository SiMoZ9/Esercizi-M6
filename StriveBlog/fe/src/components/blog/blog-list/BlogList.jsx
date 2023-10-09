import React, {useState, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = props => {
  const [posts, setPosts] = useState([])
  const [loading, setIsLoading] = useState(false)


  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5050/blogPosts")
      const data = await res.json()
      setPosts(data)
      setIsLoading(false)

    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  console.log(posts)
  console.log(loading)

  return (
    <Row>
      {!loading && posts && posts.map((post, i) => (
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
