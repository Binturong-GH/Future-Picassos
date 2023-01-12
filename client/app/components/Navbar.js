import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Stack } from "@mui/system";

const Navbar = () => {
  return (
    <AppBar color="secondary" position="stick">
      <Toolbar>
        <IconButton size="small" color="primary edge=" start aria-label="label">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Grace Shopper
        </Typography>

        <Stack direction="row" spacing={2}>
          <IconButton
            size="small"
            color="primary edge="
            start
            aria-label="label"
          >
            <HomeIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              User Profile
            </Typography>
          </IconButton>
          <Button color="primary">Cart</Button>
          <Button color="primary">Contact</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
