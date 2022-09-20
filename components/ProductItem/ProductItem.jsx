import { Card, CardMedia, Rating } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import { urlForThumbnail } from '../../utils/image';

import {
  AddShoppingCart,
  Visibility,
  CommentOutlined,
} from '@mui/icons-material';

export default function ProductItem({ product }) {
  return (
    <Card className="CardItemContainer" key={product.slug}>
      <div className="card">
        <div className="imgBx">
          <CardMedia
            component="img"
            image={urlForThumbnail(product.image)}
            title={product.name}
          ></CardMedia>
          <ul className="action">
            <li>
              <div>
                <CommentOutlined />
                <span>Voir Commentaires</span>
              </div>
            </li>
            <li>
              <NextLink href={`/product/${product.slug.current}`} passHref>
                <Visibility />
              </NextLink>
              <span>Voir details</span>
            </li>
            <li>
              <div>
                <AddShoppingCart />
                <span>Ajouter au Panier</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="contentCard">
          <div className="productName">
            <h3>{product.name}</h3>
          </div>
          <div className="price_rating">
            <h2>{product.price} €</h2>
            <div className="rating">
              <Rating value={product.rating} readOnly className='rating'></Rating>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
