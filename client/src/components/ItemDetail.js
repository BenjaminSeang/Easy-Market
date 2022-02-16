import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import ItemForm from './ItemForm';

const ItemDetail = (props) => {

    const {id} = props;

    const [product, setProduct] = useState({
        title: "",
        price: "",
        description: "",
        shipping: "",
        image: "",
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }, [])

    const deleteItem = (id)=>{
        console.log("deleting:",id)
        axios.delete(`http://localhost:8000/api/products/${id}`, {withCredentials:true})
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate('/')
            })
            .catch((err)=>console.log(err))
    }

    return(
        <div className='wrapper'>
            <p>{product.title}</p>
            <img src={product.image} alt="Product image"/>
            <p>Description: {product.description}</p>
            <p>${product.price}</p>
            <p>{product.shipping}</p>
            <button onClick={()=>deleteItem(product._id)}>Buy Now!</button>
            <button>
                <Link to={'/'}>
                    Back To Home
                </Link>
            </button>
        </div>
    )

}

export default ItemDetail;