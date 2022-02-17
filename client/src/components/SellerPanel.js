import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import LogoutButton from './LogoutButton';
import Button from 'react-bootstrap/Button'
import ItemCard from './ItemCard';

const SellerPanel = (props) => {
    const [sellerProductList, setSellerProductList] = useState([]);
    const {username} = props;

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/productsbyseller/${username}`,
        {withCredentials: true}
        )
            .then((res)=>{
                console.log(res.data);
                setSellerProductList(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })

    }, [])

    const deleteProduct = (id)=>{
        axios.delete(`http://localhost:8000/api/products/${id}`, {withCredentials: true})
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setSellerProductList(sellerProductList.filter((product, index)=>product._id !== id))
            })
            .catch((err)=>console.log(err))

    }

    const logoutStyle = {
        display: "inline",
        marginLeft: "10px"
    }

    return (
        <div className='wrapper'>
            <header>
                <h1>Seller {username} Panel</h1>
                <div className='navBarButtons'>
                    <Link to={`/seller/newlisting/${username}`} style={{marginLeft: 10}}> 
                        <Button>
                            List an Item
                        </Button>
                    </Link>

                    <Link to={`/`} style={{marginLeft: 10}}> 
                        <Button>
                            Back to Home
                        </Button>
                    </Link>
                    <div style={logoutStyle}>
                        <LogoutButton />
                    </div>
                    
                </div>
            </header>
                <div className='gallery'>
                    {
                        sellerProductList.map((product, index) => (
                            <div key={index}>
                                <ItemCard 
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    shipping={product.shipping}
                                    id={product._id}
                                    page={"sellerPanel"}
                                    deleteProduct = {deleteProduct}
                                    username = {username}
                                />
                            </div>
                        ))
                    }
                </div>
        </div>
    )
}


export default SellerPanel;
