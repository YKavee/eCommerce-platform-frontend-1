import React from 'react'
import {IndividualProduct} from './IndividualProduct'

export const Products = ({products,addToCart}) => {

    // console.log(products);
    
    return products.map((individualProduct)=>(
        <IndividualProduct key = {individualProduct._id} individualProduct={individualProduct}
           addToCart={addToCart}
        />
    ))
}
