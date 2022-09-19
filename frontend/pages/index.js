import { Typography } from '@mui/material';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>J&Kamazon</title>
        <meta
          name="description"
          content="E-commerce WebSite like Amazon by J&k Web Artist francais du web moderne"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Typography component={'h1'} variant="h1">
        J&Kamazon
      </Typography>
    </div>
  );
}
