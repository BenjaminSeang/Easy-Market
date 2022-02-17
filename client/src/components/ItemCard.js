import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import HomeNavBar from './HomeNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const ItemCard = (props) => {

    const {title, price, image, shipping, id, page, deleteProduct, username} = props;
    
    if(page == "home"){
        return(
            <div>
                <Card className='item-card'>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>${price}</Card.Text>
                        <Card.Text>{shipping}</Card.Text>
                        <Link to={`/itemdetail/${id}`}>
                            <Button>
                                View This Item
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    else if(page == "sellerPanel"){
        return(
            <div>
                <Card className='item-card'>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>${price}</Card.Text>
                        <Card.Text>{shipping}</Card.Text>
                        <Link to={`/seller/edititem/${username}/${id}`}>
                            <Button>Edit</Button>
                        </Link>
                        <Button style={{marginLeft: 10}} onClick={()=> deleteProduct(id)}>Delete</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    
}
                                


export default ItemCard;
