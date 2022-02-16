import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import HomeNavBar from './HomeNavBar';


const Home = (props) => {

    const [productList, setProductList] = useState([]);
    const [user, setUser] = useState({});
    
    //get the full product list
    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then((res) => {
                console.log(res.data)
                setProductList(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    
    //get logged in user if exists
    useEffect(() => {
        axios.get("http://localhost:8000/api/users/secure",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    
    
    return (
        <div style={{ textAlign: "center" }}>
            <header>
                <h1>Easy Market</h1>
                <HomeNavBar user={user} setUser={setUser}/>
            </header>

            {
                productList.map((product, index) => (
                    <div key={index}>
                            <p>{product.title}</p>
                            <img src={product.image} alt="Product image"/>
                            <p>${product.price}</p>
                            <p>{product.shipping}</p>
                            <button>
                                <Link to={`/itemdetail/${product._id}`}>
                                    View This Item
                                </Link>
                            </button>
                    </div>
                ))
            }
        </div>
    )
}


export default Home;