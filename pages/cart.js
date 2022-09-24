import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSnackbar } from 'notistack';

import Layout from '../components/Layout';
import { DeleteOutlineOutlined, CancelOutlined } from '@mui/icons-material';
import { Store } from '../utils/store';
import axios from 'axios';
import { useRouter } from 'next/router';

function CartScreen() {
  const router = useRouter();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      enqueueSnackbar('Désolé. Produit épuisé', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    });
    enqueueSnackbar(`${item.name} mis a jour dans le panier`, {
      variant: 'success',
    });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    enqueueSnackbar('Votre Produit a été supprimer', { variant: 'error' });
  };

  return (
    <Layout title="Votre Panier">
      <Typography component="h1" variant="h1" textAlign={'center'}>
        VOTRE PANIER
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          <Typography>
            Votre Panier est vide!{' '}
            <NextLink href="/" passHref>
              <Link> Faire les courses</Link>
            </NextLink>{' '}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell align="right">Quantité</TableCell>
                    <TableCell align="right">Prix</TableCell>

                    <TableCell align="center">
                      <DeleteOutlineOutlined />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._key}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>{item.price} € </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          <CancelOutlined />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card className="ContainerShadow">
              <List>
                <ListItem>
                  <Typography variant="h2" textAlign={'right'}>
                    Sous Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    articles) :{' '}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)} €
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      router.push('/shipping');
                    }}
                  >
                    Regler
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
