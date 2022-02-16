import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';

const LogoutButton = (props) => {

    const {setUser} = props;

    const logout = (e) => {
        axios
        .post(
            "http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
        .then((res) => {
            console.log(res);
            console.log(res.data);
            if(setUser){
                setUser({});
            }
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
export default LogoutButton