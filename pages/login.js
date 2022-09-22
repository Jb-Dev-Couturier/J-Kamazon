import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link';

import Form from '../components/Form';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getError } from '../utils/error';

export default function LoginScreen() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {redirect}= router.query

    useEffect(() => {
      if (userInfo) {
        router.push(redirect || '/');
      }
    }, [router, userInfo, redirect]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout title="Page de connexion">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component={'h1'} variant="h1">
          Connection
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  inputProps={{ type: 'email' }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === 'pattern'
                        ? 'Email non Valide.'
                        : 'Email requis'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 6,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Mot de passe"
                  inputProps={{ type: 'password' }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === 'minLength'
                        ? 'Mot de passe avec 6 caractere min SVP.'
                        : 'Mot de passe requis'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Connection
            </Button>
          </ListItem>
          <ListItem>
            Vous n'avez pas de comptes?{' '}
            <NextLink href={`'/register?redirect=${redirect || '/'}`} passHref>
              <Link> Cliquez Ici ?</Link>
            </NextLink>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
