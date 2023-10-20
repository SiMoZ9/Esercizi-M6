import React, {useEffect} from 'react';
import NavBar from "../../components/navbar/BlogNavbar";
import Footer from "../../components/footer/Footer";
import {useSearchParams, useParams, useNavigate} from "react-router-dom";
import {isAuth} from "../../middlewares/ProtectedRoutes";
import jwtDecode from "jwt-decode";
const Success = () => {

    const token = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (token.token) {
            localStorage.setItem('loggedInUser', JSON.stringify(token.token));
            navigate('/home')
        }
    }, []);

    return (
        <>
            <NavBar/>

            <Footer/>
        </>
    );
};

export default Success;