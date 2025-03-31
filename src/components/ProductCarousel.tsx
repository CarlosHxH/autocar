"use client";
// components/ProductCarousel.tsx
import React, { useRef } from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { type Product } from '@/prisma/data';
import { useRouter } from 'next/navigation';
import { useCart } from 'react-use-cart';

// Interface para as props do componente
interface ProductCarouselProps {
  products: Product[];
  title?: string;
}

// Componente de container estilizado para a lista horizontal
const ProductContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '10px',
  },
  padding: theme.spacing(2, 0),
  position: 'relative',
}));

// Componente estilizado para cada produto
const ProductCard = styled(Card)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 280,
  margin: theme.spacing(0, 1),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
}));

// Botões de navegação estilizados
const NavButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  zIndex: 10,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, title = "Produtos em Destaque" }) => {
  const { addItem } = useCart();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Função para rolar para a esquerda
  const scrollLeft = (): void => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Função para rolar para a direita
  const scrollRight = (): void => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };


  return (
    <Box sx={{ position: 'relative', py: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
        {title}
      </Typography>
      
      <NavButton
        onClick={scrollLeft}
        sx={{ left: 5 }}
        aria-label="produto anterior"
      >
        <NavigateBeforeIcon />
      </NavButton>
      
      <ProductContainer ref={containerRef}>
        {products.map((product) => (
          <ProductCard key={product.id} onClick={() => router.push(`/product/${product.id}`)}>
            <CardMedia
              component="img"
              height="160"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', p: 1 }}
            />
            <CardContent>
              <Typography variant="subtitle1" component="div" noWrap sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {product.category}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Código: {product.code}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                R$ {product.price.toFixed(2)}
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<ShoppingCartIcon />}
                fullWidth
                onClick={() => addItem(product, 1)}
              >
                Adicionar
              </Button>
            </CardContent>
          </ProductCard>
        ))}
      </ProductContainer>
      
      <NavButton
        onClick={scrollRight}
        sx={{ right: 5 }}
        aria-label="próximo produto"
      >
        <NavigateNextIcon />
      </NavButton>
    </Box>
  );
};

export default ProductCarousel;