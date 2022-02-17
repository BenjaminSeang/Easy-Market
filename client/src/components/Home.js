import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeNavBar from './HomeNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemCard from './ItemCard';

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
        <div>
            <div className='wrapper'>
                <header>
                    <h1>Easy Market</h1>
                    <HomeNavBar user={user} setUser={setUser}/>
                </header>
                <div className='gallery'>
                    {
                        productList.map((product, index) => (
                            <div key={index}>
                                    <ItemCard 
                                        title={product.title}
                                        image={product.image}
                                        price={product.price}
                                        shipping={product.shipping}
                                        id={product._id}
                                        page={"home"}
                                    />                 
                            </div>
                        ))
                    }
                </div>
                
            </div>
        </div>
    )
}


export default Home;