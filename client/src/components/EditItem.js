import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import ItemForm from './ItemForm';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
        <div className='form-wrapper'>
            <header>
                <h1>Edit an Item</h1>
                <div className="navBarButtons">
                    <Link to={`/seller/panel/${username}`}>
                        <Button>
                            Back to Seller Panel
                        </Button>
                    </Link>
                </div>
                
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