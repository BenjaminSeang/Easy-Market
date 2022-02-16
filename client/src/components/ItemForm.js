import React, { useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const ItemForm = (props) => {
    
    const {product, setProduct, submitHandler, errors} = props;

    const onChangeHandler = (e)=>{
        console.log(product)
        const newStateObject = {...product};
        newStateObject[e.target.name]  = e.target.value;

        console.log("e.target.name = ", e.target.name)
        console.log("e.target.value = ", e.target.value)
        
        setProduct(newStateObject);
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Title</label>
                    <input value={product.title} name="title" onChange={(e)=>onChangeHandler(e)} type="text" />

                    {
                        errors.title?
                        <span>{errors.title.message}</span>
                        :null
                    }
                </div>

                <div>
                    <label>Price</label>
                    <input value={product.price} name="price" onChange={(e)=>onChangeHandler(e)} type="number" />

                    {
                        errors.price?
                        <span>{errors.price.message}</span>
                        :null
                    }
                </div>

                <div>
                    <label>Description</label>
                    <input value={product.description} name="description" onChange={(e)=>onChangeHandler(e)} type="text" />

                    {
                        errors.description?
                        <span>{errors.description.message}</span>
                        :null
                    }
                </div>
                
                <div>
                    <label>Shipping</label>
                    <select value={product.shipping} name="shipping" onChange={(e)=>onChangeHandler(e)}type="text">
                        <option value="none" defaultValue hidden>Select a shpping method</option>
                        <option value="Free Shipping">Free Shipping</option>
                        <option value="Buyer pays for the shipping">Buyer pays for the shipping</option>
                    </select>

                    {
                        errors.shipping?
                        <span>{errors.shipping.message}</span>
                        :null
                    }
                </div>
                
                <div>
                    <label>Image</label>
                    <input value={product.image} name="image" onChange={(e)=>onChangeHandler(e)} type="text" />

                    {
                        errors.image?
                        <span>{errors.image.message}</span>
                        :null
                    }
                </div>

                <button>List It</button>
            </form>
        </div>
    )
    
}
export default ItemForm;