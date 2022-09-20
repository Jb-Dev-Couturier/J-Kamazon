import { Alert, CircularProgress, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem/ProductItem';

import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/store';

export default function Home() {
    const {
      state: { cart },
      dispatch,
    } = useContext(Store);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
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

    const addToCartHandler = async (product) => {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        enqueueSnackbar('Sorry. Product is out of stock', { variant: 'error' });
        return;
      }
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: {
          _key: product._id,
          name: product.name,
          countInStock: product.countInStock,
          slug: product.slug.current,
          price: product.price,
          image: urlForThumbnail(product.image),
          quantity,
        },
      });
      enqueueSnackbar(`${product.name} added to the cart`, {
        variant: 'success',
      });
      router.push('/cart');
    };

  return (
    <Layout>
      <Typography component="h1" variant="h1" textAlign={'center'}>
        VOTRE MAGASIN J&KAMAZON
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, idx) => (
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
              key={idx}
              className="ContainerCard"
            >
              <ProductItem
                product={product}
                addToCartHandler={addToCartHandler}
              ></ProductItem>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
