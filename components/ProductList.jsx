import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
        console.log(product)
        return (
          <Grid
            item
            xs={12}
            sm={6}
            key={uniqid()}
          >
            <ProductItem
              mediaUrl={product.mobileImageURLs[0]}
              mediaTitle={product.productName}
              productName={product.productName}
              brand={product.brandName}
              price={<Box color="success.main">{product.price}</Box>}
              sku={product.code}
              sku={product.code}
              productUrl={product.pdpURL}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default ProductList;