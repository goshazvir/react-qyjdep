import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const NoResults = (props) => {
    const { msg } = props

    return (
        <Typography variant="h3" component="h3" gutterBottom>
            {msg}
        </Typography>
    )
}

NoResults.propTypes = {
    msg: PropTypes.string
};

export default NoResults;