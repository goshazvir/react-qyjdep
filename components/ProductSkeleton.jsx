import React from 'react';
import uniqid from 'uniqid';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductSkeleton = (props) => {
  const { length } = props
  let arrayOfSkeletons = [];

  const SkeletonTemplate = () => {
    return (
      <Grid
        item
        xs={12}
        sm={6}
        key={uniqid()}
      >
        <Skeleton variant="rect" height={456} style={{ marginBottom: 16 }} />
        <Skeleton height={40} width="68%"  style={{ marginBottom: 8 }} />
        <Skeleton height={16} width="80%" style={{ marginBottom: 4 }} />
        <Skeleton height={16} width="72%" style={{ marginBottom: 4 }} />
        <Skeleton height={16} width="56%" style={{ marginBottom: 4 }} />
      </Grid>
    )
  }

  for (let i = 0; i < length; i++) {
    arrayOfSkeletons.push(SkeletonTemplate())
  }

  return (
    <>
      {arrayOfSkeletons}
    </>
  )
}

export default ProductSkeleton;