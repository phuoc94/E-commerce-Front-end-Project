import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

const CategoryPage = () => {
  const { category } = useParams();
  return <Box>{category}</Box>;
};

export default CategoryPage;
