import React from "react";
import { Container } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";
import useSession from "../../hooks/useSession";
import MainLayout from "../../layout/MainLayout";

const Home = props => {

    const session = useSession()
    console.log(session)

  return (
      <MainLayout>
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog! </h1>
      <BlogList />
    </Container>
      </MainLayout>
  );
};

export default Home;
