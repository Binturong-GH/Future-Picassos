import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuList,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Stack } from '@mui/system';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color='secondary' position='stick'>
        <Toolbar>
          <IconButton
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
            <Button
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <PermIdentityIcon />
            </Button>

            <IconButton
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

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList onClick={handleClose}>Profile</MenuList>
        <MenuList onClick={handleClose}>Logout</MenuList>
      </Menu>
    </>
  );
};

export default Navbar;
