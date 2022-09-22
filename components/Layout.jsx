import { createTheme } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import {
  AppBar,
  Box,
  ThemeProvider,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Copyright,
  StorefrontOutlined,
  LoginOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
} from '@mui/icons-material';

import { ShoppingCartOutlined } from '@mui/icons-material';

import classes from '../utils/classes';
import { Store } from '../utils/store';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
      secondary: {
        main: '#208080',
      },
      tertiary: {
        main: '#b80707',
      },
    },
  });

  //darkModeChangeHandler
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippingAdress');
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - J&Kamazon` : 'J&Kamazon'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand} className="brandText">
                    <StorefrontOutlined className="iconMui" /> J&Kamazon
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="../cart" passHref>
                <Link>
                  <Typography component={'span'}>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="tertiary"
                        badgeContent={cart.cartItems.length}
                      >
                        <ShoppingCartOutlined className="cartI" />
                      </Badge>
                    ) : (
                      <ShoppingCartOutlined className="cartI alt" />
                    )}
                  </Typography>
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    sx={classes.navbarButton}
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      <ManageAccountsOutlined />
                      {''}
                      {''}Profile
                    </MenuItem>
                    <MenuItem onClick={logoutClickHandler}>
                      <LogoutOutlined />
                      {''}
                      {''}LogOut
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href={'/login'}>
                  <Link>
                    <LoginOutlined className="cartI alt" />
                  </Link>
                </NextLink>
              )}
              
            </Box>
          </Toolbar>
        </AppBar>
        <Container component={'main'} sx={classes.main}>
          {children}
        </Container>
        <Box component={'footer'} sx={classes.footer} className="footer">
          <Typography className="footerText">
            Touts droits Réservés. <Copyright className="iconMui footerI" />{' '}
            J&K-Web 2022
          </Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
