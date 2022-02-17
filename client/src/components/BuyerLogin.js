import React, { useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BuyerLogin = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res,);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div className='form-wrapper'>
            <h1>Login</h1>
            <Link to={"/register"}>No account? Register now!</Link>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>

            <Form className="form-control form-control-lg" onSubmit={login}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Link to={'/'}>
                    <Button style={{marginLeft: 10}}>
                        Back to Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
};


export default BuyerLogin