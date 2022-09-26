import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Rating,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem/ProductItem';
import classes from '../utils//classes';
import client from '../utils/client';
import { urlForThumbnail } from '../utils/image';
import { Store } from '../utils/store';

const prices = [
  {
    name: '1€ to 50€',
    value: '1-50',
  },
  {
    name: '51€ to 200€',
    value: '51-200',
  },
  {
    name: '201€ to 1000€',
    value: '201-1000',
  },
];

const ratings = [1, 2, 3, 4, 5];

export default function SearchScreen() {
  const router = useRouter();
  const {
    category = 'tout',
    query = 'tout',
    price = 'tout',
    rating = 'tout',
    sort = 'default',
  } = router.query;
  const [state, setState] = useState({
    categories: [],
    products: [],
    error: '',
    loading: true,
  });

  const { loading, products, error } = state;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();

    const fetchData = async () => {
      try {
        let gQuery = '*[_type == "product"';
        if (category !== 'tout') {
          gQuery += ` && category match "${category}" `;
        }
        if (query !== 'tout') {
          gQuery += ` && name match "${query}" `;
        }
        if (price !== 'tout') {
          const minPrice = Number(price.split('-')[0]);
          const maxPrice = Number(price.split('-')[1]);
          gQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }
        if (rating !== 'tout') {
          gQuery += ` && rating >= ${Number(rating)} `;
        }
        let order = '';
        if (sort !== 'default') {
          if (sort === 'le plus bas') order = '| order(price asc)';
          if (sort === 'le plus haut') order = '| order(price desc)';
          if (sort === 'le mieux noté') order = '| order(rating desc)';
        }

        gQuery += `] ${order}`;
        setState({ loading: true });

        const products = await client.fetch(gQuery);
        setState({ products, loading: false });
      } catch (err) {
        setState({ error: err.message, loading: false });
      }
    };
    fetchData();
  }, [category, price, query, rating, sort]);

  const filterSearch = ({ category, sort, searchQuery, price, rating }) => {
    const path = router.pathname;
    const { query } = router;
    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e) => {
    filterSearch({ rating: e.target.value });
  };

  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar(`Desole. Le produit n'est plus en stock`, { variant: 'error' });
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
    enqueueSnackbar(`${product.name} Ajouter aux panier`, {
      variant: 'success',
    });
    router.push('/cart');
  };

  return (
    <Layout title="Rechercher">
      <Grid sx={classes.section} container spacing={2}>
        <Grid item md={3}>
          <List>
            <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography>Categories</Typography>
                <Select fullWidth value={category} onChange={categoryHandler}>
                  <MenuItem value="tout">Tout</MenuItem>
                  {categories &&
                    categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography>Prix</Typography>
                <Select value={price} onChange={priceHandler} fullWidth>
                  <MenuItem value="tout">Tout</MenuItem>
                  {prices.map((price) => (
                    <MenuItem key={price.value} value={price.value}>
                      {price.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={classes.fullWidth}>
                <Typography>Notes</Typography>
                <Select value={rating} onChange={ratingHandler} fullWidth>
                  <MenuItem value="tout">Tout</MenuItem>
                  {ratings.map((rating) => (
                    <MenuItem dispaly="flex" key={rating} value={rating}>
                      <Rating value={rating} readOnly />
                      <Typography component="span">&amp; Up</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products && products.length !== 0 ? products.length : 'Pas de'}{' '}
              Resultats
              {query !== 'tout' && query !== '' && ' : ' + query}
              {price !== 'tout' && ' : Prix ' + price}
              {rating !== 'tout' && ' : Notes ' + rating + ' & up'}
              {(query !== 'tout' && query !== '') ||
              rating !== 'tout' ||
              price !== 'tout' ? (
                <Button onClick={() => router.push('/search')}>X</Button>
              ) : null}
            </Grid>

            <Grid item>
              <Typography component="span" sx={classes.sort}>
                Triez par :
              </Typography>
              <Select value={sort} onChange={sortHandler}>
                <MenuItem value="default">Défaut</MenuItem>
                <MenuItem value="le plus bas">Prix: De bas en haut</MenuItem>
                <MenuItem value="le plus haut">Prix: Haut en bas</MenuItem>
                <MenuItem value="le mieux noté">Avis des clients</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid sx={classes.section} container spacing={3}>
            {loading ? (
              <CircularProgress />
            ) : error ? (
              <Alert>{error}</Alert>
            ) : (
              <Grid container spacing={3}>
                {products.map((product) => (
                  <Grid item md={6} key={product.name}>
                    <ProductItem
                      product={product}
                      addToCartHandler={addToCartHandler}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
