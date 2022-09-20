import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem/ProductItem';

import client from '../utils/client';

export default function Home() {
  const [state, setState] = useState({
    products: [],
    error: '',
    loading: true,
  });
  const { loading, error, products } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        setState({ products, loading: false });
      } catch (error) {
        setState({ loading: false, error: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, idx) => (
            <Grid item md={4} sm={6} xs={12}key={idx} className='ContainerCard'>
              <ProductItem product={product}></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
