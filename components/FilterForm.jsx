import React from 'react';
import TextField from '@material-ui/core/TextField';

const FilterForm = () => {
    return (
        <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Filter Products By Name" />
        </form>
    )
}

export default FilterForm;