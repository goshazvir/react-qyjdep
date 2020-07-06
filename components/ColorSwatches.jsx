import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  avatarSize: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const ColorSwatches = (props) => {
  const { colorSwatch } = props
  const classes = useStyles();

  return (
    colorSwatch.map(item => {
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

ColorSwatches.propTypes = {
  colorSwatch: PropTypes.array.isRequired
};

export default ColorSwatches;