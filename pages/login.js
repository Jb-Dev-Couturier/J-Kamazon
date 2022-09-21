import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link';

import Form from '../components/Form';
import Layout from '../components/Layout';

export default function LoginScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submitHandler = ({email, password}) => {};

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
            <NextLink href={'/register'} passHref>
              <Link> Cliquez Ici ?</Link>
            </NextLink>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
