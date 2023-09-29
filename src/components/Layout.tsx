import React, { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { Box, Container, Typography } from '@mui/material';

import NavBar from './TopNavBar/NavBar';

const Layout: React.FC = () => {
  return (
    <Fragment>
      <NavBar />

      <Box component="main" sx={{ backgroundColor: '#dbdcdc' }}>
        <Outlet />
      </Box>

      <Box component="footer">
        <Container>
          <Typography variant="h2" component="h1">
            This is the footer
          </Typography>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Layout;
