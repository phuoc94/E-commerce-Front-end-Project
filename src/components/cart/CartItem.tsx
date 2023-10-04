import React from 'react';

import { Add, Remove } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  ButtonBase,
  Grid,
  IconButton,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import { Item } from '../../store/reducers/cart.slice';

type CartItemProps = {
  item: Item;
};

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const CartItem = ({ item }: CartItemProps) => {
  return (
    <Grid
      container
      padding={2}
      display={'flex'}
      justifyContent={'space-between'}
    >
      <Grid item xs={3}>
        <ButtonBase sx={{ width: 64, height: 64 }}>
          <Img alt="complex" src={item.images[0]} />
        </ButtonBase>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction={'column'} gap={1}>
          <Grid item>
            <Typography variant="h6">{item.title}</Typography>
          </Grid>
          <Grid item>
            <Typography>{item.price} € / pcs</Typography>
            <Box display={'flex'} gap={1}>
              <IconButton aria-label="decrease" disabled={item.quantity === 1}>
                <Remove fontSize="inherit" />
              </IconButton>
              <TextField
                variant="outlined"
                size="small"
                sx={{
                  maxWidth: '70px',
                  '& input': {
                    textAlign: 'center',
                  },
                }}
                value={item.quantity}
              />
              <IconButton aria-label="increase">
                <Add fontSize="inherit" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="end"
          sx={{ height: '100%' }}
        >
          <Grid item>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography variant="h6">{item.price * item.quantity} €</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartItem;
