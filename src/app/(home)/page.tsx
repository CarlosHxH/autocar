"use client"
import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  InputBase,
  alpha,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Build as BuildIcon,
  DirectionsCar as DirectionsCarIcon,
  Settings as SettingsIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';
import { Product, BannerImage, CartItem } from './types';
import ProductCard from './ProductCard';
import Cart from './Cart';
import useSWR from 'swr';
import { fetcher } from '@/lib/apiFetch';
import { PageContainer } from '@toolpad/core';
import { useCart } from 'react-use-cart';

// Props para a Home Page
interface HomeProps {
  products: Product[];
  banners: BannerImage[];
}

// Home Page Component
function Home({ products, banners }: HomeProps) {

  const [displayedProductCount, setDisplayedProductCount] = useState<number>(8);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState<boolean>(false);

  const { addItem } = useCart()

  // Função para carregar mais produtos
  const handleLoadMoreProducts = () => {
    setLoadingMoreProducts(true);

    // Simula um carregamento para dar feedback visual ao usuário
    setTimeout(() => {
      setDisplayedProductCount(prevCount => prevCount + 8);
      setLoadingMoreProducts(false);
    }, 500);
  };

  // Filtra os produtos que não são promoções
  const regularProducts = products.filter((product) => !product.isPromotion);
  // Determina se deve mostrar o botão "Ver Mais"
  const hasMoreProducts = displayedProductCount < regularProducts.length;

  const categoryList = [
    { text: 'Motor', icon: <BuildIcon /> },
    { text: 'Suspensão', icon: <DirectionsCarIcon /> },
    { text: 'Elétrica', icon: <SettingsIcon /> },
    { text: 'Freios', icon: <ChevronRightIcon /> },
    { text: 'Acessórios', icon: <ChevronRightIcon /> },
  ];

  return (
    <PageContainer >

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box textAlign={'center'}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton type="button" aria-label="search" size="small">
                    <SearchIcon />
                  </IconButton>
                ),
                sx: { pr: 0.5, mr: 1 },
              },
            }}
            sx={{ width: {xs: '100%',sm: 600} }}
          />
        </Box>
        <Toolbar />

        {/* Banner Carousel */}
        <Carousel>
          {banners && banners.map((banner) => (
            <Paper key={banner.id} sx={{ position: 'relative', height: { xs: 200, sm: 300, md: 400 } }}>
              <Box
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src={banner.images}
                alt={banner.title}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  p: 2,
                }}
              >
                <Typography variant="h5">{banner.title}</Typography>
                <Typography variant="body2">{banner.description}</Typography>
              </Box>
            </Paper>
          ))}
        </Carousel>
        {/* Categories Showcase */}
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            Categorias
          </Typography>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            {categoryList.map((category, index) => (
              <Grid size={{ xs: 4, sm: 3, md: 2 }} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box sx={{ p: 1 }}>
                    {category.icon}
                  </Box>
                  <Typography variant="subtitle1">{category.text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Promotion Products */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              Ofertas Especiais
            </Typography>

            <Grid container spacing={3}>
              {products && products.filter((product) => product.isPromotion)
                .map((product) => (
                  <Grid size={{ xs: 6, sm: 3, md: 4 }} key={product.id}>
                    <ProductCard
                      product={product}
                      onAddToCart={() => addItem(product)}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          <Divider />
          {/* Featured Products */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
              Produtos em Destaque
            </Typography>

            <Grid container spacing={3}>
              {regularProducts
                .slice(0, displayedProductCount)
                .map((product) => (
                  <Grid size={{ xs: 6, sm: 3, md: 4 }} key={product.id}>
                    <ProductCard
                      product={product}
                      onAddToCart={() => addItem(product)}
                    />
                  </Grid>
                ))}
            </Grid>

            {/* Botão Ver Mais Produtos atualizado */}
            {hasMoreProducts && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  color="error"
                  variant="outlined"
                  size="large"
                  onClick={handleLoadMoreProducts}
                  disabled={loadingMoreProducts}
                >
                  {loadingMoreProducts ? 'Carregando...' : 'Ver Mais Produtos'}
                </Button>
              </Box>
            )}
          </Box>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: '#1a237e', color: 'white', py: 6, mt: 4 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <Typography variant="h6" gutterBottom>
                  AUTO PEÇAS EXPRESS
                </Typography>
                <Typography variant="body2">
                  Sua loja completa de auto peças com os melhores preços do mercado.
                  Entrega para todo Brasil com rapidez e qualidade.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Contato
                </Typography>
                <Typography variant="body2" paragraph>
                  Telefone: (11) 1234-5678
                </Typography>
                <Typography variant="body2" paragraph>
                  Email: contato@autopecasexpress.com.br
                </Typography>
                <Typography variant="body2">
                  Endereço: Av. das Autopeças, 1000 - São Paulo/SP
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Horário de Funcionamento
                </Typography>
                <Typography variant="body2" paragraph>
                  Segunda a Sexta: 08:00 - 18:00
                </Typography>
                <Typography variant="body2">
                  Sábado: 08:00 - 13:00
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
              <Typography variant="body2" align="center">
                © {new Date().getFullYear()} Auto Peças Express. Todos os direitos reservados.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </PageContainer>
  );
}

export default function Page() {
  const { data } = useSWR('/api/products', fetcher);
  if (!data) return <>Loading...</>;
  const { products, banners } = data
  return (<Home products={products} banners={banners} />)
}



// Componentes estilizados
const SearchBox = styled('div')(({ theme }: any) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }: any) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }: any) => ({
  color: 'primary',
  maxWidth: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
