import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip } from '@mui/material';

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl?: string;
  rating: number;
  discount?: number;
  inStock: boolean;
  onBuyClick?: () => void;
  onDetailsClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  rating,
  discount = 0,
  inStock,
  onBuyClick,
  onDetailsClick
}) => {
  const originalPrice = discount > 0 
    ? price / (1 - (discount / 100)) 
    : price;
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 300,
        margin: 'auto',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)'
        },
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Discount Chip */}
      {discount > 0 && (
        <Chip 
          label={`-${discount}%`} 
          color="error" 
          size="small"
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            zIndex: 10 
          }} 
        />
      )}
      
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || '/placeholder-auto-part.png'}
        alt={name}
        sx={{ 
          objectFit: 'contain', 
          backgroundColor: '#f5f5f5' 
        }}
        onClick={onDetailsClick}
      />
      
      <CardContent>
        {/* Rating and Stock Status */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 1 
        }}>
          <Rating 
            value={rating} 
            precision={0.5} 
            readOnly 
            size="small"
          />
          
          <Chip 
            label={inStock ? "Em Estoque" : "Esgotado"} 
            color={inStock ? "success" : "error"}
            size="small" 
          />
        </Box>
        
        {/* Product Name */}
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 1
          }}
        >
          {name}
        </Typography>
        
        {/* Pricing */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2 
        }}>
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              fontSize: '1.25rem',
              fontWeight: 'bold' 
            }}
          >
            R$ {price.toFixed(2)}
          </Typography>
          
          {discount > 0 && (
            <Typography 
              variant="body2" 
              sx={{ 
                textDecoration: 'line-through',
                color: 'gray',
                ml: 1
              }}
            >
              R$ {originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
        
        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1 
        }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={onBuyClick}
            disabled={!inStock}
            size="small"
          >
            Comprar
          </Button>
{/*       
          <Button variant="outlined" color="primary"sx={{ minWidth: 'auto', px: 1 }}size="small">
            <LocalShippingIcon fontSize="small" />
          </Button>
*/}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;