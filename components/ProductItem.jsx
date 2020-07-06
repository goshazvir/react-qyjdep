import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  mediaHeight: {
    height: 456,
  }
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
    color,
    colorSwatch
  } = props

  const classes = useStyles();

  return (
    <Card>
      {mediaUrl &&
        <CardMedia
          className={classes.mediaHeight}
          image={mediaUrl}
          title={mediaTitle}
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
            <div className="price">
              <Typography
                gutterBottom
                variant="button"
              >
                {price}
              </Typography>
            </div>
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
        <ul className="list">{colorSwatch}</ul>
      </CardContent>
    </Card>
  )
}

ProductItem.propTypes = {
  mediaUrl: PropTypes.string,
  mediaTitle: PropTypes.string,
  productName: PropTypes.string,
  brand: PropTypes.string,
  sku: PropTypes.string,
  price: PropTypes.object.isRequired,
  productUrl: PropTypes.string,
  color: PropTypes.string,
  colorSwatch: PropTypes.object
};

export default ProductItem;