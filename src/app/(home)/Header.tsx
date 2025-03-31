// In your header or navigation component
"use client"

import React from 'react';
import { AppBar, Toolbar, Container, Box } from '@mui/material';
import SearchBar from '@/src/components/SearchBar'; // Adjust the import path as needed
import { mockProducts } from '@/prisma/data'; // Import your products data

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar>
          {/* Your logo and other header elements */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar 
              products={mockProducts} 
              placeholder="Buscar produtos, categorias, códigos..." 
            />
          </Box>
          {/* Cart, account buttons, etc. */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;