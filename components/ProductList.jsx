import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { onSnapshot } from "mobx-state-tree"
import store from './../store/appStore';
import productItemsOnPage from './../config/config';
import uniqid from 'uniqid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ProductItem from './ProductItem';
import ProductSkeleton from './ProductSkeleton';
import ColorSwatches from './ColorSwatches';



const ProductList = (props) => {
  const { data } = props
  const [pageID, setPageID] = useState(1);
  let productMinValue = pageID === 1 ? 0 : (pageID - 1) * productItemsOnPage;
  let productMaxValue = productItemsOnPage === 1 ? productItemsOnPage : pageID * productItemsOnPage;

  useEffect(() => {
    onSnapshot(store, snapshot => {
      if (store.PageID[0].PageID) {
        setPageID(store.PageID[0].PageID)
      }
    })
  }, []);

  return (
    <>
      {data ?
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