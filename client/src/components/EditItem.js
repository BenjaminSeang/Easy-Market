import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import ItemForm from './ItemForm';

const EditItem = (props) => {

    const {id, username} = props;

    const [errors, setError] = useState({})

    const [productToEdit, setProductToEdit] = useState({
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
                setProductToEdit(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    }, [])



    const submitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${id}`, productToEdit, {withCredentials: true})
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
            product = {productToEdit}
            setProduct = {setProductToEdit}
            submitHandler = {submitHandler}
            errors = {errors}
            />    
        </div>
    )

}

export default EditItem;