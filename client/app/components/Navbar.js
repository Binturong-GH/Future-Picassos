import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const redirectToCart = () => {
    navigate('/cart');
  };
  const redirectToAllProducts = () => {
    navigate('/products');
  };
  return (
    <AppBar color='secondary' position='stick'>
      <Toolbar>
        <IconButton
          onClick={redirectToAllProducts}
          size='small'
          color='primary edge='
          start
          aria-label='label'
        >
          <HomeIcon />
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Grace Shopper
        </Typography>

        <Stack direction='row' spacing={2}>
          <IconButton
            size='small'
            color='primary edge='
            start
            aria-label='label'
          >
            <PermIdentityIcon />
            <Typography variant='h8' component='div' sx={{ flexGrow: 1 }}>
              User Profile
            </Typography>
          </IconButton>
          <IconButton
            onClick={redirectToCart}
            size='small'
            color='primary edge='
            start
            aria-label='label'
          >
            <ShoppingCartIcon />
            <Typography variant='h8' component='div' sx={{ flexGrow: 1 }}>
              Cart
            </Typography>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
