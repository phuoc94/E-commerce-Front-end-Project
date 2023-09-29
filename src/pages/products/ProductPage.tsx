import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import ImageDisplay from '../../components/products/ImageDisplay';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProduct } from '../../store/reducers/product.slice';

const ProductPage = () => {
  const { productId } = useParams();

  const { product, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [dispatch, productId]);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container>
        <h1>Something went wrong</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ justifyContent: 'center' }}>
          <ImageDisplay imageUrls={product.images} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ padding: '20px' }}
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Typography variant="h3">{product.price} €</Typography>
              <Box display={'flex'} gap={1}>
                <IconButton
                  aria-label="delete"
                  size="large"
                  disabled={quantity === 1}
                  onClick={(e) => quantity > 1 && setQuantity(quantity - 1)}
                >
                  <Remove fontSize="inherit" />
                </IconButton>
                <TextField
                  variant="outlined"
                  sx={{
                    maxWidth: '70px',
                    '& input': {
                      textAlign: 'center',
                    },
                  }}
                  value={quantity}
                />
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={(e) => setQuantity(quantity + 1)}
                >
                  <Add fontSize="inherit" />
                </IconButton>
              </Box>
            </Box>
            <Button variant="contained" fullWidth>
              Add to Card
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
