import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import Form from '../components/Form';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Store } from '../utils/store';
import Cookies from 'js-cookie';

export default function PaymentScreen() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, [router, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('Méthode de paiements requis', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };

  return (
    <Layout title={'Moyen de Paiment'}>
      <CheckoutWizard activeStep={2}></CheckoutWizard>
          <Typography component={'h1'} variant="h1">
            Moyen de Paiments
          </Typography>
        <Form onSubmit={submitHandler}>
          <List>
            <ListItem>
              <FormControl component={'fieldset'}>
                <RadioGroup
                  aria-label="Methode Paiments"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value={'PayPal'}
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Stripe"
                    value={'Stripe'}
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Espèces"
                    value={'cash'}
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
              >
                Continuer
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                type="button"
                fullWidth
                color="secondary"
                onClick={() => router.push('/shipping')}
              >
                Retour
              </Button>
            </ListItem>
          </List>
        </Form>
      
    </Layout>
  );
}
