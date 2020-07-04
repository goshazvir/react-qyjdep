import React, { Component } from 'react';
import { render } from 'react-dom';
import Grid from '@material-ui/core/Grid';
import ProductList from './components/ProductList';
import './style.css';

class App extends Component {
  render() {
    return (
      <>
        <Grid container spacing={3}>
          <ProductList />
        </Grid>
      </>
    );
  }
}

render(<App />, document.getElementById('root'));
