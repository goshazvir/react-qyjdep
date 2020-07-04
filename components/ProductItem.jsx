import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 400,
  },
});

const ProductItem = (props) => {
  const {
    mediaUrl,
    mediaTitle,
    productName,
    brand,
    sku,
    price,
    productUrl,
    content
  } = props

  const classes = useStyles();

  return (
    <Card>
      <CardMedia
        className={classes.media}
        image={mediaUrl}
        title={mediaTitle}
      />
      <CardContent>
        <Link href={productUrl}>
          {productName}
        </Link>
        <Typography gutterBottom variant="h5" component="h2">
          {price}
        </Typography>
        <Typography variant="overline" color="textSecondary" component="p">
          {brand}
        </Typography>
        <Typography variant="caption" color="textSecondary" component="p">
          <span>{sku}</span>
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductItem;