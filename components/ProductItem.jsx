import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';

const ProductItem = (props) => {
  const {
    content
  } = props

  return (
    <>
      <Grid item xs={12} sm={6}>
        {content}
      </Grid>
    </>  
  )
}

export default ProductItem;