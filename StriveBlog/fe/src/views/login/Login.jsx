import React, {useState} from 'react';
import "./styles.css"

const Login = () => {
    const [loginData, setLoginData] = useState({})

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setLoginData({
            ...loginData,
            [name]: value
        })
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center w-50 h-50 sm bg-color">
            <form className="d-flex flex-column gap-2 p-3 ">
                <h1>Login</h1>
                <input
                    name="email"
                    type="text"
                    required
                    onChange={handleInputChange}
                />
                <input
                    name="password"
                    type="password"
                    required
                    onChange={handleInputChange}
                />
                <button type="submit">
                </button>
            </form>
        </div>
    )
}

export default Login