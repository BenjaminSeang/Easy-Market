import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import LogoutButton from './LogoutButton';

const HomeNavBar = (props) => {
    const {user, setUser} = props;
    const username = user.username;

    if(user.type == 'Buyer'){
        return(
            <div>
                <LogoutButton setUser={setUser}/>
            </div>
        )
    }else if(user.type == 'Seller'){
        return(
            <div>
                <button>
                    <Link to={`/seller/panel/${username}`}>
                        Seller Panel
                    </Link>
                </button>
                <LogoutButton setUser={setUser}/>
            </div>
        )
    }else{
        return(
            <div>
                <button>
                    <Link to={"/buyer/login"}>Buyer Login</Link>
                </button>
                <button>
                    <Link to={"/seller/login"}>Seller Login</Link>
                </button>
            </div>
        )
    }

}

export default HomeNavBar;