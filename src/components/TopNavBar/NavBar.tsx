import { Link } from 'react-router-dom';

import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import SearchBox from './SearchBox';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }} marginTop={{ xs: '135px', md: '71px' }}>
      <AppBar position="fixed">
        <Container>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
            marginTop={0}
          >
            <Grid item sx={{ display: { xs: 'grid', md: 'none' } }}>
              <Box
                display="flex"
                alignItems="center"
                sx={{ display: { xs: 'flex', md: 'none' } }}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Typography>Menu</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography
                variant="h6"
                to="/"
                component={Link}
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>
            </Grid>
            <Grid item order={{ md: 3 }}>
              <Stack direction="row" spacing={2}>
                <Link to="profile">
                  <AccountCircle />
                </Link>
                <ShoppingCart />
              </Stack>
            </Grid>
            <Grid item xs={12} md={8} order={{ md: 2 }}>
              <SearchBox />
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
