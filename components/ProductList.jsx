import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import uniqid from 'uniqid';
import Grid from '@material-ui/core/Grid';
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
        return (
          <Grid
            item
            xs={12}
            sm={6}
            key={uniqid()}
          >
            <ProductItem
              content={product.brandName}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default ProductList;