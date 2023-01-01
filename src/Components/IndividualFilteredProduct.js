import React from 'react'

export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={"http://localhost:3000/"+individualFilteredProduct.productImage} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualFilteredProduct.name}</div>
            
            <div className='product-text price'>Rs. {individualFilteredProduct.price}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div> 
    )
}