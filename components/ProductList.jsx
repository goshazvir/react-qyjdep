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
  let productMinValue = pageID === 1 ? 0 : (pageID - 1) * productItemsOnPage;
  let productMaxValue = productItemsOnPage === 1 ? productItemsOnPage : pageID * productItemsOnPage;

  onSnapshot(store, snapshot => {
    if (store.PageID[0].PageID) {
      setPageID(store.PageID[0].PageID)
    }

    if (data && store.FilterByName[0].FilterByName) {
      const results = data.filter(item =>
        item.productName.includes(store.FilterByName[0].FilterByName)
      )
      setFilteredProducts(results)
    }
  })

  const ifSearchHandled = () => {
    if (filteredProducts.length === 0) {
      return (
        <NoResults msg="No Results Found!" />
      )
    }
    return (
        filteredProducts.map(product => {
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

  const paginationHandled = () => {
    return (
      data.slice(productMinValue, productMaxValue).map(product => {
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

  const renderProducts = () => {
    if (Array.isArray(filteredProducts) && filteredProducts.length >= 0) {
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