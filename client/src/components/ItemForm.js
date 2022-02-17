import React from 'react';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


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
            <Form className="form-control form-control-lg" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Title</Form.Label>
                    {errors.title ? (
                        <span className="error-text">
                            {errors.title.message}
                        </span>
                    ) : null}
                    <Form.Control 
                        name="title" 
                        value={product.title} 
                        onChange={(e) => onChangeHandler(e)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Price $</Form.Label>
                    {errors.price ? (
                        <span className="error-text">
                            {errors.price.message}
                        </span>
                    ) : null}
                    <Form.Control 
                        name="price" 
                        value={product.price} 
                        onChange={(e) => onChangeHandler(e)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Description</Form.Label>
                    {errors.description ? (
                        <span className="error-text">
                            {errors.description.message}
                        </span>
                    ) : null}
                    <Form.Control 
                        name="description" 
                        value={product.description} 
                        onChange={(e) => onChangeHandler(e)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Shipping</Form.Label>
                    {errors.shipping ? (
                        <span className="error-text">{errors.shipping.message}</span>
                    ) : null}
                    <select 
                        className="form-select" 
                        name="shipping" 
                        value={product.shipping} 
                        onChange={(e) => onChangeHandler(e)}>
                        <option defaultValue="None">Choose your shipping method</option>
                        <option value="Free Shipping">Free shipping, you pay for the shipping</option>
                        <option value="Buyer pays for the shipping">Buyer pays for the shipping</option>
                    </select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Image URL</Form.Label>
                    {errors.image ? (
                        <span className="error-text">
                            {errors.image.message}
                        </span>
                    ) : null}
                    <Form.Control 
                        name="image" 
                        value={product.image} 
                        onChange={(e) => onChangeHandler(e)}>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    List Item
                </Button>
            </Form>
        </div>
    )

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