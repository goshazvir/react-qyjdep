import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { onSnapshot } from "mobx-state-tree"
import store from './../store/appStore';
import productItemsOnPage from './../config/config';
import uniqid from 'uniqid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ProductItem from './ProductItem';
import ProductSkeleton from './ProductSkeleton';
import NoResults from './NoResults';
import ColorSwatches from './ColorSwatches';

const ProductList = (props) => {
  const { data } = props
  const [pageID, setPageID] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState('');
  const STORE_FILTERED_PRODUCTS = store.FilterByName[0].FilterByName;

  let productMinValue = pageID === 1 ? 0 : (pageID - 1) * productItemsOnPage;
  let productMaxValue = productItemsOnPage === 1 ? productItemsOnPage : pageID * productItemsOnPage;

  onSnapshot(store, snapshot => {
    const STORE_PAGE_ID = store.PageID[0].PageID;

    if (STORE_PAGE_ID) {
      setPageID(STORE_PAGE_ID)
    }

    if (data && !!STORE_FILTERED_PRODUCTS.length) {
      const results = data.filter(item =>
        item.productName.includes(STORE_FILTERED_PRODUCTS)
      )
      setFilteredProducts(results)
    } else {
      setFilteredProducts(data)
    }
  })

  const productsTemplate = (productsArray) => {
    return (
      productsArray.map(product => {
        const {
          mobileImageURLs,
          productName,
          brandName,
          price,
          code,
          pdpURL,
          color,
          colorSwatch
        } = product
  
        return (
          <Grid
            item
            xs={12}
            sm={6}
            key={uniqid()}
          >
            <ProductItem
              mediaUrl={mobileImageURLs[0]}
              mediaTitle={productName}
              productName={productName}
              brand={brandName}
              price={<Box color="success.main">{price}</Box>}
              sku={code}
              productUrl={pdpURL}
              color={color}
              colorSwatch={colorSwatch[0] && <ColorSwatches colorSwatch={colorSwatch} />}
            />
          </Grid>
        )
      })
    )
  }

  const ifSearchHandled = () => {
    if (filteredProducts.length === 0) {
      return (
        <NoResults msg="No Results Found!" />
      )
    }
    return (
      productsTemplate(filteredProducts.slice(productMinValue, productMaxValue))
    )
  }

  const paginationHandled = () => {
    if (data) {
      return (
        productsTemplate(data.slice(productMinValue, productMaxValue))
      )
    }
  }

  const renderProducts = () => {
    if (STORE_FILTERED_PRODUCTS) {
      return ifSearchHandled()
    } else {
      return paginationHandled()
    }
  }

  return (
    <>
      {data ?
          renderProducts()
        : <ProductSkeleton length={6} />
      }
    </>
  )
}

ProductList.propTypes = {
  data: PropTypes.array,
  pageID: PropTypes.number
};


export default ProductList;