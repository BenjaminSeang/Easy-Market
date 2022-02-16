import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import LogoutButton from './LogoutButton';


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

    return (
        <div>
            <h1>Seller {username} Panel</h1>
            <LogoutButton/>
            <button> 
                <Link to={`/seller/newlisting/${username}`}>
                    List an Item
                </Link>
            </button>
            <button> 
                <Link to={`/`}>
                    Back to Home
                </Link>
            </button>

            {
                sellerProductList.map((product, index) => (
                    <div key={index}>
                            <p>{product.title}</p>
                            <img src={product.image} alt="Product image"/>
                            <p>Description: {product.description}</p>
                            <p>${product.price}</p>
                            <p>{product.shipping}</p>
                            <button>
                                <Link to={`/seller/edititem/${username}/${product._id}`}>Edit</Link>
                            </button>
                            <button onClick={()=> deleteProduct(product._id)}>
                                Delete
                            </button>
                    </div>
                ))
            }
        </div>
    )
}


export default SellerPanel;