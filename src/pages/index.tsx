import { useEffect } from 'react';

import { Box } from '@mui/material';

import { fetchAllProductAsync } from '../features/products/product.slice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';

const HomePage = () => {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch]);

  return (
    <Box>
      {products &&
        products.map((p) => (
          <div key={p.id}>
            {p.title} {p.price}
          </div>
        ))}
    </Box>
  );
};

export default HomePage;
