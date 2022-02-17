import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate} from '@reach/router';
import Button from 'react-bootstrap/Button';

const ItemDetail = (props) => {

    const {id} = props;
    
    const [user, setUser] = useState({})

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

    //when user buys an item, delete it
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

    //only show buy button if the user is a buyer
    if(user.type == 'Buyer'){
        return(
            <div className='wrapper'>
                <header>
                    <h1>{product.title}</h1>
                    <div className='navBarButtons'>
                        <Link to={'/'}>
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                </header>
                <div className='detail-page'>
                    <div>
                        <img style={{width: 400, height: 400}} src={product.image} alt="Product image"/>
                    </div>
                    <div style={{marginLeft: 200}}>
                        <h3>Price: ${product.price}</h3>
                        <h3>Description: {product.description}</h3>
                        <h4>{product.shipping}</h4>
                        <Button style={{marginTop: 200}} onClick={()=>deleteItem(product._id)}>Buy Now!</Button>
                    </div>
                </div>
            </div>
        )

    }else{
        return(
            <div className='wrapper'>
                <header>
                    <h1>{product.title}</h1>
                    <div className='navBarButtons'>
                        <Link to={'/'}>
                            <Button>Back to Home</Button>
                        </Link>
                    </div>
                </header>
                <div className='detail-page'>
                    <div>
                        <img style={{width: 400, height: 400}} src={product.image} alt="Product image"/>
                    </div>
                    <div style={{marginLeft: 200}}>
                        <h3>Price: ${product.price}</h3>
                        <h3>Description: {product.description}</h3>
                        <h4>{product.shipping}</h4>
                    </div>
                </div>
            </div>
        )
    }

    

}

export default ItemDetail;