import React from 'react';

import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

const ProductPage = () => {
  const { productId } = useParams();

  return <Box>{productId}</Box>;
};

export default ProductPage;
