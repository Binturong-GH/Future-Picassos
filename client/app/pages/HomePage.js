import React, { Fragment } from "react";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Router
import { Link as RouterLink } from "react-router-dom";
const imagesList = [
  {
    id: 1,
    img: "../images/alien1.png",
    title: "alien",
  },
  {
    id: 2,
    img: "../images/alienFam.png",
    title: "alienFam",
  },
  {
    id: 3,
    img: "../images/beach.png",
    title: "beach",
  },
  {
    id: 4,
    img: "../images/ben7.png",
    title: "ben",
  },
  {
    id: 5,
    img: "../images/earring.png",
    title: "earring",
  },
];

const HomePage = () => {
  return (
    <Fragment>
      <CssBaseline />
      {/* Image list */}
      <Container maxWidth="false" disableGutters>
        <Box sx={{ bgcolor: "#111", height: "100vh" }}>
          <ImageList
            sx={{ width: "100%", pt: 20, mt: 0 }}
            cols={5}
            rowHeight={400}
          >
            {imagesList.map((item) => (
              <ImageListItem key={item.id}>
                <img src={item.img} alt={item.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>

      {/* Overlap */}
      <Backdrop
        sx={{ color: "#111827", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <Container maxWidth="xl" sx={{ color: "#fff" }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", textAlign: "center", mb: 6 }}
          >
            Future Picassos
          </Typography>
          <Container
            maxWidth="md"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Welcome to Future Picassos, an e-commerce platform where we offer
              a wide range of unique and beautiful children's art for sale.
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              We are passionate about inspiring and encouraging creativity in
              children, and believe that art plays an important role in their
              development.
            </Typography>
            <Typography variant="h5" sx={{ mb: 10, fontWeight: "bold" }}>
              Whether you're looking for a special gift for a child in your
              life, or simply want to support and celebrate the artistic
              achievements of young creators, you'll find something special
              here. Browse our selection today and discover the joy of
              children's art!
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="/products"
              size="large"
              sx={{
                bgcolor: "#fff",
                color: "#333",
                px: 4,
                py: 2,
                "&:hover": {
                  bgcolor: "#a3a3a3",
                  color: "#fff",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Typography>
            </Button>
          </Container>
        </Container>
      </Backdrop>
    </Fragment>
  );
};

export default HomePage;
