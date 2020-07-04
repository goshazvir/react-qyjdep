import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import uniqid from 'uniqid';
import productsApiData from './../apis/productsApiData';
import ProductItem from './ProductItem';

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const ProductList = () => {
  const [productsData, setProductsData] = useState();

  const classes = useStyles();

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsApiData.get();
    setProductsData(response.data.pageItems)
  }

  const renderColorSwatches = (items) => {
    return (
      items.colorSwatch.map(item => {
        return (
          <li className="list-item" key={uniqid()}>
            <Avatar src={item.imageURL} className={classes.avatarSize} />
          </li>
        )
      })
    )
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
              mediaUrl={product.mobileImageURLs[0]}
              mediaTitle={product.productName}
              productName={product.productName}
              brand={product.brandName}
              price={<Box color="success.main">{product.price}</Box>}
              sku={product.code}
              productUrl={product.pdpURL}
              color={product.color}
              colorSwatch={product.colorSwatch.length && renderColorSwatches(product)}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default ProductList;