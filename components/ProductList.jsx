import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import uniqid from 'uniqid';
import productsApiData from './../apis/productsApiData';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import ProductItem from './ProductItem';

const PRODUCT_ITEMS_SHOWED_ON_PAGE = 10;

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const ProductList = () => {
  const [productsData, setProductsData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showItems, setShowItems] = useState(PRODUCT_ITEMS_SHOWED_ON_PAGE);
  const PAGINATION_ITEMS_LENGTH = (productsData && (productsData.length / PRODUCT_ITEMS_SHOWED_ON_PAGE));

  const classes = useStyles();

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsApiData.get();
    setProductsData(response.data.pageItems)
  }

  const getCurrentPageId = (type, page, selected) => {
    if (selected) {
      setCurrentPage(page)
    }
  }

  const renderColorSwatches = (items) => {
    return (
      items.colorSwatch.map(item => {
        return (
          <li className="list-item" key={uniqid()}>
            <Link
              href="https://www.google.com/"
              target="_blank"
              rel="noreferrer"
              color="inherit"
            >
              <Avatar src={item.imageURL} className={classes.avatarSize} />
            </Link>
          </li>
        )
      })
    )
  }

  const renderSkeletons = () => {
    const skeleton = () => {
      return (
        <Grid
          item
          xs={12}
          sm={6}
          key={uniqid()}
        >
          <Skeleton variant="rect" height={456} style={{ marginBottom: 16 }} />
          <Skeleton variant='h1' width="68%"  style={{ marginBottom: 8 }} />
          <Skeleton height={16} width="80%" style={{ marginBottom: 4 }} />
          <Skeleton height={16} width="72%" style={{ marginBottom: 4 }} />
          <Skeleton height={16} width="56%" style={{ marginBottom: 4 }} />
        </Grid>
      )
    }

    return (
      <>
        {skeleton()}
        {skeleton()}
        {skeleton()}
        {skeleton()}
      </>  
    )
  }

  let productStartItem = currentPage === 1 ? 0 : (currentPage - 1) * PRODUCT_ITEMS_SHOWED_ON_PAGE
  let productEndItem = currentPage === 1 ? PRODUCT_ITEMS_SHOWED_ON_PAGE : currentPage * PRODUCT_ITEMS_SHOWED_ON_PAGE

  return (
    <>
      {productsData ?
        productsData.slice(productStartItem, productEndItem).map(product => {
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
                colorSwatch={product.colorSwatch[0] && renderColorSwatches(product)}
              />
            </Grid>
          )
        })
        : renderSkeletons()
      }
      <Pagination
        count={PAGINATION_ITEMS_LENGTH}
        getItemAriaLabel={getCurrentPageId}
        variant="outlined"
        shape="rounded"
      />
    </>
  )
}

export default ProductList;