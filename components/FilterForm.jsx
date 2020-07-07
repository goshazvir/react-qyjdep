import React from 'react';
import PropTypes from 'prop-types';
import store from './../store/appStore';
import TextField from '@material-ui/core/TextField';

const FilterForm = (props) => {
    const {
        id,
        label,
    } = props

    const handleChange = (event) => {
        store.FilterByName[0].setFilterValue(event.target.value)
    }

    return (
        <form noValidate autoComplete="off">
            <TextField onChange={handleChange} id={id} label={label} />
        </form>
    )
}

FilterForm.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string
};
  

export default FilterForm;