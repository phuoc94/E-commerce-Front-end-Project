import { Fragment, useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { Delete, Edit } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { deleteProduct } from '../../store/actions/product.actions';
import { addItemToCart } from '../../store/reducers/cart.slice';
import { Product } from '../../types/product.types';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [imgSrc, setImgSrc] = useState(
    `https://docketevents.com/assets/images/image_placeholder.jpg`,
  );

  const { profile } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkImageLoaded = async () => {
      for (const image of product.images) {
        try {
          await axios.get(image);
          setImgSrc(image);
          break;
        } catch (error) {}
      }
    };
    checkImageLoaded();
  }, [product]);

  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addItemToCart({ product }));
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Link to={`/products/${product.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={product.title}
            height="140"
            image={imgSrc}
            title={product.title}
          />
          <CardContent>
            <Typography variant="body1">{product.title}</Typography>
            <Typography variant="caption">
              {product.description.length > 40
                ? `${product.description.slice(0, 40)}...`
                : product.description}
            </Typography>
            <Typography variant="h6">{product.price} €</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="Add to Favorites">
          <FavoriteIcon />
        </IconButton>
        {profile?.role === 'admin' && (
          <Fragment>
            <IconButton
              aria-label="Delete"
              onClick={(e) => handleDeleteProduct(product.id)}
            >
              <Delete />
            </IconButton>
            <IconButton aria-label="Edit">
              <Edit />
            </IconButton>
          </Fragment>
        )}
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
