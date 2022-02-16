import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link} from '@reach/router';


const Register = (props)=>{

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        username: "",
        email: "",
        type: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e)=>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials:true
        })
        .then((res)=>{
            console.log(res.data);
            setUser({
                username: "",
                email: "",
                type: "",
                password: "",
                confirmPassword: "",
            });
            setConfirmReg(
                "Thank you for Registering, you can now log in!",
            );
            setErrors({}); 
        })
        .catch((err)=>{
            console.log(err);
            setErrors(err.response.data.errors);
        })


    }




return(
    <div>

        <h1>Register</h1>
        {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
        <form onSubmit={register}>
            <div>
                <label>Username</label>
                {errors.username ? (
                    <span className="error-text">
                        {errors.username.message}
                    </span>
                ) : null}
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div>
                <label>Email</label>
                {errors.email ? (
                    <span className="error-text">{errors.email.message}</span>
                ) : null}
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>User Type</label>
                <select type="text" name="type" onChange={handleChange} >
                    <option value="none" defaultValue hidden>Select a user type</option>
                    <option value="Buyer">I am a Buyer</option>
                    <option value="Seller">I am a Seller</option>
                </select>
            </div>
            <div>
                <label>Password</label>
                {errors.password ? (
                    <span className="error-text">
                        {errors.password.message}
                    </span>
                ) : null}
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Confirm Password</label>
                {errors.confirmPassword ? (
                    <span className="error-text">
                        {errors.confirmPassword.message}
                    </span>
                ) : null}
                <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                />
            </div>
            <div className="center">
                <button>Register Me</button>
            </div>
        </form>
        <button>
            <Link to={'/'}>
                Back to Home
            </Link>
        </button>
    </div>
)}


export default Register;