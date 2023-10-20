import React, {useEffect, useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap'
import "./styles.css"
import {useNavigate} from "react-router-dom";
import NavLog from "./NavLog";
import Footer from "../../components/footer/Footer";
import {isAuth} from "../../middlewares/ProtectedRoutes";
import useSession from "../../hooks/useSession";

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const [login, setLogin] = useState(null)

    const navigate = useNavigate()
    const session = useSession()

    useEffect(() => {
        if (session) {
            navigate('/home')
        }
    }, []);
    const handleInputChange = (e) => {
        const {name, value} = e.target

        setLoginData({
            ...loginData,
            [name]: value
        })

        console.log(loginData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const postData = await fetch(`${process.env.REACT_APP_URL}/login`, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(loginData)
            })
            const data = await postData.json()
            console.log(loginData)

            if (data.token) {
                localStorage.setItem('loggedInUser', JSON.stringify(data.token))
                navigate("/home")
            }
            setLogin(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleGithubLogin = () => {
        window.location.href = 'http://localhost:5050/auth/github'
    }

    return (
        <>
        <NavLog/>
        <Container className="d-flex flex-column mt-4">
            <h1 className="text-center mb-4">Login</h1>
        <Form className="d-flex flex-column align-items-center justify-content-center" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Inserisci email" name="email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Inserisci password" name="password" onChange={handleInputChange} />
            </Form.Group>

            <Button style={{backgroundColor: "#00d66f", border: "0px"}} type="submit">
                Submit
            </Button>

            <Button style={{backgroundColor: "#00d66f", border: "0px"}} className="mt-3" onClick={() => handleGithubLogin()}>
                Signin with GitHub
            </Button>
        </Form>
        </Container>
            <Footer/>
        </>
    )
}

export default Login