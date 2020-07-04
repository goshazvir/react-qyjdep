import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import uniqid from 'uniqid';
import productsApiData from './../apis/productsApiData'
import ProductItem from './ProductItem'

const ProductList = () => {
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsApiData.get();
    setProductsData(response.data.pageItems)
  } 

  if (productsData) {
    console.log(productsData)
  }

  return (
    <>
      {productsData && productsData.map(product => {
        return <ProductItem key={uniqid()} content={product.brandName} />
      })}
    </>
  )
}

export default ProductList;