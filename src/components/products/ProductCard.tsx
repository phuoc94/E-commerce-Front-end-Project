import { Link } from 'react-router-dom';

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
import { addItemToCart } from '../../store/reducers/cart.slice';
import { Product } from '../../types/product.types';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(addItemToCart(product));
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={product.title}
            height="140"
            image={product.images[0]}
            title={product.title}
          />
          <CardContent>
            <Typography variant="body2">{product.title}</Typography>
            <Typography variant="h6">{product.price} €</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton aria-label="Add to Favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
