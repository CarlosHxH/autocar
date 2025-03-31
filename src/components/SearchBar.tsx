"use client"

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Paper, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Typography,
  Divider,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  code: string;
  image: string;
  images: string[];
  rating: number;
  inStock: boolean;
  discount?: number;
  specifications: { [key: string]: string };
  variants?: {
    color?: string;
    size?: string;
    price?: number
  }[];
  isPromotion?: boolean;
}

interface SearchBarProps {
  products: Product[];
  placeholder?: string;
}

const SearchBar = ({ products, placeholder = "Buscar produtos, categorias, códigos..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    
    if (value.trim().length > 2) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(value.toLowerCase()) || 
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        product.code.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchTerm.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
    }
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (product: Product) => {
    return product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;
  };

  return (
    <Box 
      ref={searchRef}
      sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: 600,
        margin: '0 auto'
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'background.paper',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton 
                  edge="end" 
                  onClick={handleClearSearch}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </form>

      {/* Search Results Dropdown */}
      {isSearchOpen && searchResults.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 0.5,
            maxHeight: 400,
            overflow: 'auto'
          }}
        >
          <List sx={{ p: 0 }}>
            {searchResults.slice(0, 5).map((product, index) => (
              <React.Fragment key={product.id}>
                <ListItem 
                  component={Link}
                  href={`/product/${product.id}`}
                  sx={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      src={product.image || product.images[0]} 
                      alt={product.name}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">{product.name}</Typography>
                        {product.inStock ? (
                          <Chip size="small" label="Em estoque" color="success" sx={{ height: 20 }} />
                        ) : (
                          <Chip size="small" label="Esgotado" color="error" sx={{ height: 20 }} />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {product.description.substring(0, 60)}...
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                            R$ {calculateDiscountedPrice(product).toFixed(2)}
                          </Typography>
                          {product.discount && (
                            <Typography 
                              variant="caption" 
                              sx={{ ml: 1, textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                              R$ {product.price.toFixed(2)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < searchResults.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            
            {/* View all results link */}
            {searchResults.length > 5 && (
              <ListItem 
                component={Link}
                href={`/search?q=${encodeURIComponent(searchTerm)}`}
                sx={{
                  justifyContent: 'center',
                  color: 'primary.main',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                Ver todos os {searchResults.length} resultados
              </ListItem>
            )}
          </List>
        </Paper>
      )}

      {/* No results message */}
      {isSearchOpen && searchTerm.trim().length > 2 && searchResults.length === 0 && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            mt: 0.5,
            p: 2,
            textAlign: 'center'
          }}
        >
          <Typography variant="body1">
            Nenhum produto encontrado para &quot;{searchTerm}&quot;
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar;