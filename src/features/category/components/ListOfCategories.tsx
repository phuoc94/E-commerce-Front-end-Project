import React, { Fragment, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { fetchCategories } from '../category.slice';
import CategoryCard from './CategoryCard';

const ListOfCategories = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Fragment>
      <Typography
        variant="h2"
        sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        align="center"
      >
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories &&
          categories.map((p) => (
            <Grid item xs={6} sm={4} md={3} key={p.id}>
              <Link to={`category/${p.name}`}>
                <CategoryCard title={p.name} image={p.image} />
              </Link>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default ListOfCategories;