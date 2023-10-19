import React, {useState, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import {BeatLoader} from "react-spinners";

import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

import "./pagination.css"
import {SiTruenas} from "react-icons/si";

const BlogList = props => {
  const [posts, setPosts] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const fetchPosts = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('loggedInUser')
    try {
      const res = await fetch(`http://localhost:5050/blogPosts?page=${currentPage}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(token)
        }
      })
      const data = await res.json()
      setPosts(data)
      setIsLoading(false)

    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [currentPage])

  console.log(posts.posts)
  console.log(loading)

  const handlePagination = (v) => {
    setCurrentPage(v)
  }

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
        <div>
          <ResponsivePagination current={currentPage}
                                total={posts && posts.totalPages}
                                onPageChange={handlePagination}
          />
        </div>
      </Row>
        //<></>
  );
};

export default BlogList;
