import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Skeleton from '@material-ui/lab/Skeleton';
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
    content,
    color
  } = props

  const classes = useStyles();

  return (
    <Card>
      {mediaUrl ?
        <CardMedia
          className={classes.media}
          image={mediaUrl}
          title={mediaTitle}
        />
      : <Skeleton
          animation="wave"
          variant="rect"
          className={classes.media}
        />
      }
      <CardContent>
        <div className="box">
          {productName && productUrl &&
            <Typography variant="h6">
              <Link href={productUrl} color="inherit">
                {productName}
              </Link>
            </Typography>
          }
          {price &&
            <Typography
              gutterBottom
              variant="button"
              className="push"
            >
              {price}
            </Typography>
          }
        </div>
        {brand &&
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
          >
            <strong>Brand:</strong> {brand}
          </Typography>
        }
        {sku &&
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
          >
            <strong>Sku:</strong> {sku}
          </Typography>
        }
        {color &&
          <Typography
            variant="caption"
            color="textSecondary"
            component="p"
          >
            <strong>Color:</strong> {color}
          </Typography>
        }
      </CardContent>
    </Card>
  )
}

export default ProductItem;