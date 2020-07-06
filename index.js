import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import store from './store/appStore';
import productsApiData from './apis/productsApiData';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import ProductList from './components/ProductList';
import FilterForm from './components/FilterForm';
import './style.css';

const App = () => {
  const [productsData, setProductsData] = useState();
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsApiData.get();
    setProductsData(response.data.pageItems)
  }

  const getCurrentPageId = (type, page, selected) => {
    if (selected) {
      store.PageID[0].setPage(page)
    }
  }

  return (
    <>
      <Container maxWidth="sm">
          <FilterForm />
          <Grid container spacing={3}>
            <ProductList data={productsData} />
          </Grid>
          <Pagination
            count={5}
            getItemAriaLabel={getCurrentPageId}
            variant="outlined"
            shape="rounded"
          />
        </Container>
    </>
  )
}

render(<App />, document.getElementById('root'));
