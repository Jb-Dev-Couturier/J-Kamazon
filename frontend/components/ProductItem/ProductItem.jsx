import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { urlForThumbnail } from '../../utils/image';

export default function ProductItem({ product }) {
  return (
    <Card className="CardItemContainer">
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image)}
            title={product.name}
          />
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readOnly />
            <Typography >({product.numReviews} commentaires)</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>{product.price} €</Typography>
        <Button size="small" color="primary">
          Ajouter
        </Button>
      </CardActions>
    </Card>
  );
}
