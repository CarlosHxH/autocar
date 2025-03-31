import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Rating, Chip,SxProps,Theme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Interface para definir a estrutura do produto
interface ProductCardProps {
  name: string;
  price: number;
  imageUrl?: string;
  rating: number;
  discount?: number;
  inStock: boolean;
  sku?: string;
  brand?: string;
  className?: string;
  sx?: SxProps<Theme>;
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
  sku,
  brand,
  className,
  sx,
  onBuyClick,
  onDetailsClick
}) => {
  // Cálculo do preço original com desconto
  const originalPrice = discount > 0 
    ? price / (1 - (discount / 100)) 
    : price;

  return (
    <Card 
      className={className}
      sx={{
        maxWidth: 300,
        position: 'relative',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)'
        },
        ...sx
      }}
    >
      {/* Chip de desconto */}
      {discount > 0 && (
        <Chip 
          label={`-${discount}%`} 
          color="error" 
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            zIndex: 10 
          }} 
        />
      )}
      
      {/* Imagem do Produto */}
      <CardMedia
        component="img"
        height="250"
        image={imageUrl || '/placeholder-auto-part.png'}
        alt={name}
        sx={{ 
          objectFit: 'contain', 
          backgroundColor: '#f5f5f5' 
        }}
      />
      
      <CardContent>
        {/* Área de informações do produto */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Avaliação */}
          <Rating 
            name="product-rating" 
            value={rating} 
            precision={0.5} 
            readOnly 
          />
          
          {/* Status de estoque */}
          {inStock ? (
            <Chip 
              icon={<CheckCircleIcon />} 
              label="Em Estoque" 
              color="success" 
              size="small" 
            />
          ) : (
            <Chip 
              label="Esgotado" 
              color="error" 
              size="small" 
            />
          )}
        </Box>
        
        {/* Nome do Produto */}
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            mt: 2, 
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {name}
        </Typography>
        
        {/* Informações adicionais */}
        {(sku || brand) && (
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            {sku && (
              <Typography variant="body2" color="text.secondary">
                SKU: {sku}
              </Typography>
            )}
            {brand && (
              <Typography variant="body2" color="text.secondary">
                Marca: {brand}
              </Typography>
            )}
          </Box>
        )}
        
        {/* Preços */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ fontWeight: 'bold' }}
          >
            R$ {price.toFixed(2)}
          </Typography>
          
          {discount > 0 && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                textDecoration: 'line-through',
                color: 'gray'
              }}
            >
              R$ {originalPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
        
        {/* Botões de Ação */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mr: 1 }}
            onClick={onBuyClick}
            disabled={!inStock}
          >
            Comprar
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary"
            onClick={onDetailsClick}
            sx={{ 
              minWidth: 'auto', 
              px: 2 
            }}
          >
            <LocalShippingIcon />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;