"use client"

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Rating, 
  Divider, 
  Chip,
  Select,
  MenuItem,
  SelectChangeEvent,
  ImageList,
  ImageListItem
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useCart } from 'react-use-cart';
import { mockProducts, Product } from '@/prisma/data';
import { useParams } from 'next/navigation';

const ProductDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  
  // Find the product from mock data using the ID from the URL
  const product = mockProducts.find(product => product.id === id);
  
  // Handle case where product is not found
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }
  
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addItem, getItem } = useCart();

  const handleVariantChange = (event: SelectChangeEvent) => {
    setSelectedVariant(Number(event.target.value));
  };

  const calculateDiscountedPrice = () => {
    const originalPrice = product.price;
    return product.discount 
      ? originalPrice * (1 - product.discount / 100) 
      : originalPrice;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <Box sx={{ 
            mb: 2, 
            position: 'relative',
            height: { xs: 300, md: 500 }
          }}>
            {/* Main Image */}
            <img 
              src={selectedImage} 
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />

            {/* Favorite Button */}
            <Button
              onClick={() => setIsFavorite(!isFavorite)}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                minWidth: 'auto',
                bgcolor: 'white',
                borderRadius: '50%',
                p: 1
              }}
            >
              {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </Button>

            {/* Discount Chip */}
            {product.discount && (
              <Chip 
                label={`-${product.discount}%`} 
                color="error" 
                sx={{ 
                  position: 'absolute', 
                  top: 10, 
                  left: 10 
                }} 
              />
            )}
          </Box>

          {/* Thumbnail Gallery */}
          <ImageList 
            sx={{ 
              gridTemplateColumns: 'repeat(3, 1fr) !important',
              gap: 8 
            }} 
            cols={3}
          >
            {product.images.map((img) => (
              <ImageListItem 
                key={img}
                onClick={() => setSelectedImage(img)}
                sx={{ 
                  cursor: 'pointer',
                  border: selectedImage === img ? '2px solid primary.main' : 'none'
                }}
              >
                <img 
                  src={img} 
                  alt="Product Thumbnail"
                  style={{
                    width: '100%',
                    height: 100,
                    objectFit: 'contain'
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>

          {/* Rating and Stock */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={product.rating} 
              precision={0.5} 
              readOnly 
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              ({product.rating} de 5)
            </Typography>
            <Chip 
              label={product.inStock ? "Em Estoque" : "Esgotado"}
              color={product.inStock ? "success" : "error"}
              size="small"
              sx={{ ml: 2 }}
            />
          </Box>

          {/* Pricing */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h5" 
              color="primary" 
              sx={{ fontWeight: 'bold', mr: 2 }}
            >
              R$ {calculateDiscountedPrice().toFixed(2)}
            </Typography>
            {product.discount && product.discount > 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  textDecoration: 'line-through',
                  color: 'gray' 
                }}
              >
                R$ {product.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          {/* Variants Selector */}
          {product.variants && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Variante
              </Typography>
              <Select
                fullWidth
                value={selectedVariant.toString()}
                onChange={handleVariantChange}
              >
                {product.variants.map((variant, index) => (
                  <MenuItem key={index} value={index}>
                    {variant.color} - {variant.size}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {/* Description */}
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {/* Specifications */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Especificações
          </Typography>
          {Object.entries(product.specifications).map(([key, value]) => (
            <Box 
              key={key} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                py: 1,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="body2">{key}</Typography>
              <Typography variant="body2" fontWeight="bold">{value}</Typography>
            </Box>
          ))}

          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              fullWidth
              disabled={!product.inStock}
              startIcon={<LocalShippingIcon />}
              onClick={() => addItem(product, 1)}
            >
              Adicionar ao Carrinho
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              disabled={!product.inStock}
            >
              Comprar Agora
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailsPage;