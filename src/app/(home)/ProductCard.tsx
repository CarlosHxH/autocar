// src/components/ProductCard.tsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  styled
} from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { Product } from './types';
import Link from 'next/link';
import { useCart } from 'react-use-cart';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const StyledCard = styled(Card)(({ theme }: any) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const DiscountBadge = styled(Chip)(({ theme }: any) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  fontWeight: 'bold',
}));

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price;

  return (
    <StyledCard>
      {product.discount > 0 && (
        <DiscountBadge label={`-${product.discount}%`} />
      )}
      <Link href={`/product/${product.id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h3" noWrap>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.5} size="small" readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating})
            </Typography>
          </Box>

          {product.code && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Código: {product.code}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {product.discount > 0 ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}
                >
                  R$ {product.price.toFixed(2)}
                </Typography>
                <Typography variant="h6" color="error.main" fontWeight="bold">
                  R$ {discountedPrice.toFixed(2)}
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="primary" fontWeight="bold">
                R$ {product.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          {!product.inStock && (
            <Chip
              label="Fora de estoque"
              size="small"
              sx={{ mt: 1, backgroundColor: '#f44336', color: 'white' }}
            />
          )}
        </CardContent>
      </Link>
      <CardActions>
        <Button
          variant="contained"
          startIcon={<AddShoppingCart />}
          fullWidth
          disabled={!product.inStock}
          onClick={() => onAddToCart(product)}
          sx={{
            backgroundColor: product.inStock ? 'primary' : 'grey',
            '&:hover': { backgroundColor: product.inStock ? '#000051' : 'grey' }
          }}
        >
          Adicionar ao Carrinho
        </Button>
      </CardActions>
    </StyledCard>
  );
}