"use client"

import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Pagination, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Divider,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { mockProducts, type Product } from '@/prisma/data'; // Import your products data
import ProductCard from '@/src/components/ProductCard'; // Assuming you have a product card component
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentSearchTerm, setCurrentSearchTerm] = useState(query);
  const [newSearchTerm, setNewSearchTerm] = useState(query);
  
  const itemsPerPage = 12;

  // Filter products based on search query
  useEffect(() => {
    if (query) {
      setCurrentSearchTerm(query);
      setNewSearchTerm(query);
      
      const filteredProducts = mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.code.toLowerCase().includes(query.toLowerCase())
      );
      
      // Sort results
      let sortedProducts: Product[] = [...filteredProducts];
      switch (sortBy) {
        case 'price-asc':
          sortedProducts.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b));
          break;
        case 'price-desc':
          sortedProducts.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a));
          break;
        case 'name':
          sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        // For relevance, keep the default filtered order
      }
      
      setSearchResults(sortedProducts);
      setCurrentPage(1);
    }
  }, [query, sortBy]);

  // Helper function to get discounted price
  const getDiscountedPrice = (product: Product) => {
    return product.discount ? product.price * (1 - product.discount / 100) : product.price;
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo(0, 0);
  };

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string);
  };

  // Handle new search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Update URL with the new search term
    if (newSearchTerm.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(newSearchTerm.trim())}`);
      setCurrentSearchTerm(newSearchTerm.trim());
      
      const filteredProducts = mockProducts.filter(product => 
        product.name.toLowerCase().includes(newSearchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(newSearchTerm.toLowerCase())
      );
      
      setSearchResults(filteredProducts);
      setCurrentPage(1);
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resultados da busca
        </Typography>
        
        <form onSubmit={handleSearch}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar produtos..."
            value={newSearchTerm}
            onChange={(e) => setNewSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
        </form>
        
        <Divider sx={{ my: 2 }} />
      </Box>

      {/* Search info and sorting */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body1">
          {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'} para &quot;{currentSearchTerm}&quot;
        </Typography>
        
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="sort-select-label">Ordenar por</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange as (event: SelectChangeEvent<string>, child: ReactNode) => void}
            label="Ordenar por"
          >
            <MenuItem value="relevance">Relevância</MenuItem>
            <MenuItem value="price-asc">Menor preço</MenuItem>
            <MenuItem value="price-desc">Maior preço</MenuItem>
            <MenuItem value="name">Nome</MenuItem>
            <MenuItem value="rating">Avaliação</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Search results */}
      {searchResults.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {currentItems.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  imageUrl={product.image}
                  rating={product.rating}
                  discount={product.discount}
                  inStock={product.inStock}
                />
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={pageCount} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5" gutterBottom>
            Nenhum produto encontrado
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tente outros termos de busca ou navegue por categorias.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default SearchPage;