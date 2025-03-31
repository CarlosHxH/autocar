"use client"
import React, { useState } from 'react';
import { Category, LocalShipping, Build, Discount } from '@mui/icons-material';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Box, Chip } from '@mui/material';

const autoPartsCategories = [
  { 
    name: 'Motor', 
    icon: <Build />, 
    products: [
      { name: 'Filtro de Óleo', price: 29.90, image: 'https://http2.mlstatic.com/D_NQ_NP_975750-MLB72364182891_102023-O-bomba-oleo-celta-2013-2014-2015-2016-10-14-8v-schadek.webp' },
      { name: 'Correia Dentada', price: 89.90, image: 'https://josecar-maverick-produtos.s3.amazonaws.com/loja/imagens/full/10149xschadeck-9.png' }
    ]
  },
  { 
    name: 'Freios', 
    icon: <LocalShipping />, 
    products: [
      { name: 'Pastilha de Freio', price: 49.90, image: 'https://fortbras.vteximg.com.br/arquivos/ids/203136-460-460/par-disco-freio-fox-1-0-1-6-2004-a-2018-dianteiro-ventilado-hipperfreios-3.jpg?v=637281145724270000' },
      { name: 'Disco de Freio', price: 129.90, image: 'https://http2.mlstatic.com/D_NQ_NP_602821-MLB49194328542_022022-O.webp' }
    ]
  },
  { 
    name: 'Suspensão', 
    icon: <Category />, 
    products: [
      { name: 'Amortecedor', price: 199.90, image: 'https://images.tcdn.com.br/img/img_prod/809212/par_mola_suspensao_dianteira_gol_1_0_1_6_1_8_2_0_6481_1_1a0070a473d9830fcd5c76e7bceec770.jpg' },
      { name: 'Mola Suspensão', price: 149.90, image: 'https://cdn.awsli.com.br/400x400/1926/1926218/produto/140625793a700584ab8.jpg' }
    ]
  }
];

const AutoPartsHomepage = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>

      {/* Conteúdo Principal */}
      <Container sx={{ py: 4 }}>
        {/* Banners de Promoção */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Chip 
            icon={<Discount />} 
            label="Promoção: 20% OFF em peças de motor" 
            color="secondary" 
            variant="outlined"
          />
          <Chip 
            icon={<LocalShipping />} 
            label="Frete grátis acima de R$ 300" 
            color="primary" 
            variant="outlined"
          />
        </Box>

        {/* Categorias de Produtos */}
        <Typography variant="h4" gutterBottom>
          Categorias
        </Typography>
        <Grid container spacing={3}>
          {autoPartsCategories.map((category) => (
            <Grid item xs={12} sm={4} key={category.name}>
              <Card>
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center' 
                }}>
                  {category.icon}
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {category.name}
                  </Typography>
                </CardContent>
                <Grid container spacing={1} sx={{ p: 2 }}>
                  {category.products.map((product) => (
                    <Grid item xs={6} key={product.name}>
                      <Card variant="outlined">
                        <CardMedia
                          component="img"
                          height="140"
                          image={product.image}
                          alt={product.name}
                        />
                        <CardContent>
                          <Typography variant="body2">
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            R$ {product.price.toFixed(2)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="primary"
                          >
                            Comprar
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AutoPartsHomepage;