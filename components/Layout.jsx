import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import Cookies from 'js-cookie';
import { createTheme } from '@mui/material/styles';
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
} from '@mui/material';
import { Copyright, StorefrontOutlined } from '@mui/icons-material';

import classes from '../utils/classes';
import { Store } from '../utils/store';

export default function Layout({ title, description, children }) {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
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
    },
  });

  //darkModeChangeHandler
  const darkModeChangeHandler=()=>{
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode
    Cookies.set('darkMode', newDarkMode? "ON":"OFF")
  }

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