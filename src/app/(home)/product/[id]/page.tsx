"use client"
import React, { useState } from 'react';
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
import { GetServerSideProps } from 'next';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Product Interface
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
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
}

// Mock Product Data (replace with actual API call)
const mockProduct: Product = {
  id: '1',
  name: 'High-Performance Auto Part',
  price: 299.99,
  description: 'Advanced automotive component designed for optimal performance and durability. Engineered with precision to enhance your vehicle\'s efficiency and reliability.',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
};

const ProductDetailsPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(mockProduct.images[0]);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleVariantChange = (event: SelectChangeEvent) => {
    setSelectedVariant(Number(event.target.value));
  };

  const calculateDiscountedPrice = () => {
    const originalPrice = mockProduct.price;
    return mockProduct.discount 
      ? originalPrice * (1 - mockProduct.discount / 100) 
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
              alt={mockProduct.name}
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
            {mockProduct.discount && (
              <Chip 
                label={`-${mockProduct.discount}%`} 
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
            {mockProduct.images.map((img) => (
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
            {mockProduct.name}
          </Typography>

          {/* Rating and Stock */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={mockProduct.rating} 
              precision={0.5} 
              readOnly 
            />
            <Typography variant="body2" sx={{ ml: 2 }}>
              ({mockProduct.rating} de 5)
            </Typography>
            <Chip 
              label={mockProduct.inStock ? "Em Estoque" : "Esgotado"}
              color={mockProduct.inStock ? "success" : "error"}
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
            {mockProduct.discount && mockProduct.discount > 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  textDecoration: 'line-through',
                  color: 'gray' 
                }}
              >
                R$ {mockProduct.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          {/* Variants Selector */}
          {mockProduct.variants && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Variante
              </Typography>
              <Select
                fullWidth
                value={selectedVariant.toString()}
                onChange={handleVariantChange}
              >
                {mockProduct.variants.map((variant, index) => (
                  <MenuItem key={index} value={index}>
                    {variant.color} - {variant.size}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {/* Description */}
          <Typography variant="body1" paragraph>
            {mockProduct.description}
          </Typography>

          {/* Specifications */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Especificações
          </Typography>
          {Object.entries(mockProduct.specifications).map(([key, value]) => (
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
              disabled={!mockProduct.inStock}
              startIcon={<LocalShippingIcon />}
            >
              Adicionar ao Carrinho
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              disabled={!mockProduct.inStock}
            >
              Comprar Agora
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
/*
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  // In a real application, fetch product details based on ID
  return {
    props: {
      product: mockProduct
    }
  };
};
*/
export default ProductDetailsPage;