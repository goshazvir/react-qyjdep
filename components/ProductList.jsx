import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import productsApiData from './../apis/productsApiData';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import ProductItem from './ProductItem';
import ProductSkeleton from './ProductSkeleton';
import ColorSwatches from './ColorSwatches';

const PRODUCT_ITEMS_SHOWED_ON_PAGE = 10;

const ProductList = () => {
  const [productsData, setProductsData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const PAGINATION_ITEMS_LENGTH = (productsData && (productsData.length / PRODUCT_ITEMS_SHOWED_ON_PAGE));

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
                colorSwatch={product.colorSwatch[0] && <ColorSwatches product={product} />}
              />
            </Grid>
          )
        })
        : <ProductSkeleton length={6} />
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