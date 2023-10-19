import React, {useCallback, useEffect, useState} from "react";
import { Button, Container, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import UploadModal from "../../components/modal/modal_upload.jsx"
import useSession from "../../hooks/useSession";
import MainLayout from "../../layout/MainLayout";

const NewBlogPost = props => {
  const [text, setText] = useState("");
  const [post, setPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({})
  const [file, setFile] = useState(null)
  console.log(file)


  const session = useSession()
  console.log(session)

  const onChangeSetFile = (e) => {
    setFile(e.target.files[0])
  }

   const uploadFile = async (cover) => {
     const fileData = new FormData()
     fileData.append('cover', cover)

     try {
       const response = await fetch('http://localhost:5050/blogPosts/upload', {
         method: "POST",
         body: fileData
       })
       return await response.json()
     } catch (error) {
       console.log(error, 'Errore in uploadFile')
     }
   }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (file) {
      console.log(file)
      try {
        const uploadCover = await uploadFile(file)
        const finalBody = {
          ...formData,
          cover: uploadCover.cover
        }

        setLoading(true)
        await fetch('http://localhost:5050/blogPosts', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalBody),
        })
      setLoading(false)

      } catch(e) {
        console.log(error)
      }
    } else {
      console.error('Carica un file!')
    }

    }

  const handleChange = useCallback(value => {
    setText(value);
  });


  return (
      <MainLayout>
    <Container className="new-blog-container" onSubmit={handleSubmit}>
      <Form className="mt-5" encType="multipart/form-data">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" name="title"/>
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select" name="category">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3" name="content">
          <Form.Label>Contenuto Blog</Form.Label>
          <ReactQuill value={text} onChange={handleChange} className="new-blog-content" />
        </Form.Group>
        <Form.Group controlId="blog-img" className="mt-3">
          <input
            className="m-2"
            name="cover"
            type="file"
            onChange={onChangeSetFile}
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
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
      </MainLayout>
  );
};

export default NewBlogPost;
