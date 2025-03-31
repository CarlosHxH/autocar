'use client';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ProductCard from '@/src/components/ProductCard';
import { useRouter } from 'next/navigation';
import { mockProducts } from '@/prisma/data';
import Slideshow from '@/src/components/Slideshow';
import AutoPartsCards from '@/src/components/AutoPartsCards';
import { useCart } from 'react-use-cart';
import ProductCarousel from '@/src/components/ProductCarousel';
import Container from '@mui/material/Container';
import SearchBar from '@/src/components/SearchBar';


export default function HomeContent() {
  const router = useRouter();
  const { addItem } = useCart();

  return (
    <Box>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <SearchBar
          products={mockProducts}
          placeholder="Buscar produtos, categorias, códigos..."
        />
      </Box>

      <Slideshow />
      <AutoPartsCards />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProductCarousel products={mockProducts} title="Peças em Promoção" />
      </Container>

      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                Produtos
              </Typography>
              <Grid container spacing={2} columns={12} sx={{ mb: (theme) => theme.spacing(2) }}>
                {mockProducts && mockProducts.map((product, index) => (
                  <Grid size={{ xs: 12, md: 3 }} key={index}>
                    <ProductCard
                      name={product.name}
                      price={product.price}
                      rating={product.rating}
                      inStock={true}
                      discount={product.discount}
                      imageUrl={product.image}
                      onBuyClick={() => addItem(product)}
                      onDetailsClick={() => router.push(`/product/${product.id}`)}
                    />
                  </Grid>))
                }
                <Stack gap={2} direction={{ xs: 'column', sm: 'row' }}></Stack>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
