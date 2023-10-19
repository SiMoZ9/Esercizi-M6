import NavLog from "../login/NavLog";
import Footer from "../../components/footer/Footer";
import {Row, Col, Form, Button, InputGroup, Container} from "react-bootstrap"
import React, {useState} from "react";

/*
* 1 - Form
* 2 - fetch
*
* */


const AddUser = () => {

    const [formData, setFormData] = useState({})

    const handleInputChange = (e) => {
        const {name, value} = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/authors/create`, {
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            })
        } catch (err) {
            console.log(err)
        }
    }

    console.log(formData)

    return (
        <>
            <NavLog/>
            <Container className="d-flex flex-column mt-4">
                <h1 className="text-center mb-4">Sign-up</h1>
                <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" name="firstName" onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name" name="lastName" onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci email" name="email" onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Inserisci password" name="password" onChange={handleInputChange}/>
                    </Form.Group>

                    <Button style={{backgroundColor: "#00d66f", border: "0px"}} type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
            <Footer/>
        </>
    );
}

export default AddUser