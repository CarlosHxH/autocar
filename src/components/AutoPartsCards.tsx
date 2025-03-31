import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Box, Chip } from '@mui/material';
import { Category, LocalShipping, Build, Discount } from '@mui/icons-material';

const autoPartsCategories = [
  {
    name: 'Motor',
    icon: <Build />,
    products: [
      { name: 'Filtro de Óleo', price: 29.90, image: 'https://images.tcdn.com.br/img/img_prod/1153789/filtro_oleo_psl76_tecfil_837_1_1c981ec7c5e235f921b10b3e3b45b9ad.jpg' },
      { name: 'Correia Dentada', price: 89.90, image: 'https://images.tcdn.com.br/img/img_prod/1153789/kit_correia_dentada_tensor_ctvw1_1265_1_2aa2d28f488e33e5defdd62ef6f656a8.jpg' }
    ]
  },
  {
    name: 'Freios',
    icon: <LocalShipping />,
    products: [
      { name: 'Pastilha de Freio', price: 49.90, image: 'https://josecar-maverick-produtos.s3.amazonaws.com/loja/imagens/full/hqf2464acxx.png' },
      { name: 'Disco de Freio', price: 129.90, image: 'https://fortbras.vteximg.com.br/arquivos/ids/203136-460-460/par-disco-freio-fox-1-0-1-6-2004-a-2018-dianteiro-ventilado-hipperfreios-3.jpg?v=637281145724270000' }
    ]
  },
  {
    name: 'Suspensão',
    icon: <Category />,
    products: [
      { name: 'Amortecedor', price: 199.90, image: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-loftkj5c4cav73' },
      { name: 'Mola Suspensão', price: 149.90, image: 'https://images.tcdn.com.br/img/img_prod/673340/cin285_mola_suspensao_dianteira_sem_ar_corsa_1_0_1_4_1_6_8v_1_0_16v_s_ar_94_04_cindumel_41540_1_e5e5a8d0334d2a6743d09bfbe7df4359.jpg' }
    ]
  }
];

const AutoPartsCards = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Conteúdo Principal */}
      <Container sx={{ py: 4 }}>
        {/* Banners de Promoção */}
        <Box sx={{ display: {md:'flex', xs:'block'}, gap: 2, mb: 4 }}>
          <Chip
            icon={<Discount />}
            label="Promoção: 20% OFF em peças de motor"
            color="secondary"
            variant="outlined"
            sx={{mb:2}}
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
              <Card sx={{ boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)'}}>
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
                      <Card variant="outlined" sx={{
                        width: '100%',
                        maxWidth: 300,
                        margin: 'auto',
                        position: 'relative',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)'
                        },
                        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)'
                      }}>
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

export default AutoPartsCards;