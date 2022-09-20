import NextLink from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Box,
  Alert,
  CircularProgress,
  Link,
  Typography,
  Grid,
  List,
  ListItem,
  Rating,
  Card,
  Button,
} from '@mui/material';

import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';

import Layout from '../../components/Layout';
import client from '../../utils/client';
import classes from '../../utils/classes';
import { urlFor } from '../../utils/image';

export default function ProductScreen(props) {
  const { slug } = props;
  const [state, setState] = useState({
    product: null,
    loading: true,
    error: '',
  });
  const { product, loading, error } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await client.fetch(
          `
            *[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        setState({ ...state, product, loading: false });
      } catch (err) {
        setState({ ...state, error: err.message, loading: false });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink href="/" passHref>
              <Link>
                <Typography className='buttonRetour'> <UndoOutlinedIcon/> Retour</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <Image
                src={urlFor(product.image)}
                alt={product.name}
                layout="responsive"
                width={640}
                height={640}
                className="imgProduct"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <List>
                <ListItem>
                  <Typography component="h1" variant="h1">
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>Categorie : {product.category}</ListItem>
                <ListItem>Marque : {product.brand}</ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly />
                  <Typography sx={classes.smallText}>
                    ({product.numReviews} commentaires)
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Description : {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card className='CardItemDetails'>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Prix </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>{product.price} € </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Status </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography>
                          {product.countInStock > 0 ? 'En stock' : 'Rupture'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Button fullWidth variant="contained">
                      Ajoutez au Panier
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
}

export function getServerSideProps(context) {
  return {
    props: { slug: context.params.slug },
  };
}
