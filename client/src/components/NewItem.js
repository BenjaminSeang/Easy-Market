import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import ItemForm from './ItemForm';

const NewItem = (props) => {

    const {username} = props;

    const [errors, setError] = useState({})

    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        description: "",
        shipping: "",
        image: "",
    })



    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/products", newProduct, {withCredentials: true})
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate(`/seller/panel/${username}`);
        })
        .catch((err)=>{
            console.log(err);
            console.log("err.response:", err.response);
            console.log("err.response.data:", err.response.data);
            console.log("err.response.data.errors:", err.response.data.errors);
            setError(err.response.data.errors)
        })

    }

    return(
        <div className='wrapper'>
            <header>
                <h1>List an Item</h1>
                <button>
                    <Link to={`/seller/panel/${username}`}>
                        Back to Seller Panel
                    </Link>
                </button>
                
            </header>

            <ItemForm 
            username = {username}
            product = {newProduct}
            setProduct = {setNewProduct}
            submitHandler = {submitHandler}
            errors = {errors}
            />    
        </div>
    )

}

export default NewItem;