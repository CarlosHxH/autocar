import React, { useState, useEffect } from 'react';
import { Box, IconButton, Container, Typography, Button } from '@mui/material';
import { ArrowBack,ArrowForward,PlayCircle,PauseCircle } from '@mui/icons-material';

const slides = [
  {
    image: 'https://samaautopecas.com.br/wp-content/uploads/sites/2/2023/10/banner-sama.jpg',
    title: 'Paisagem Montanhosa',
    description: 'Uma vista deslumbrante das montanhas ao amanhecer'
  },
  {
    image: 'https://forteautopecas.com.br/Uploads/Imagens/2/banner-1.jpg?j_w',
    title: 'Praia Tropical',
    description: 'Águas cristalinas e areia branca de uma praia paradisíaca'
  },
  {
    image: 'https://superpecascaxias.com.br/assets/images/banner-certo1-3166x892.jpg',
    title: 'Cidade Moderna',
    description: 'Horizonte urbano com arranha-céus iluminados'
  },
  {
    image: 'https://serraf.com.br/wp-content/uploads/2023/10/Banner-Mobile-2-A-Melhor-Opcao.webp',
    title: 'Floresta Exuberante',
    description: 'Vegetação densa e verde de uma floresta tropical'
  }
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Container maxWidth="lg" sx={{ position: 'relative', mt: 4 }}>
      <Box 
        sx={{ 
          position: 'relative', 
          overflow: 'hidden', 
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              display: index === currentSlide ? 'block' : 'none',
              position: 'relative',
              width: '100%',
              height: '500px'
            }}
          >
            <img 
              src={slide.image} 
              alt={slide.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.6)',
                color: 'white',
                p: 2
              }}
            >
              <Typography variant="h5">{slide.title}</Typography>
              <Typography variant="body1">{slide.description}</Typography>
            </Box>
          </Box>
        ))}

        {/* Controles de Navegação */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            transform: 'translateY(-50%)',
            px: 1
          }}
        >
          <IconButton 
            onClick={handlePrevSlide} 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <IconButton 
            onClick={handleNextSlide}
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.7)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>

      {/* Controles de Reprodução */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          mt: 2 
        }}
      >
        <Button 
          variant="contained" 
          onClick={togglePlayPause}
          startIcon={isPlaying ? <PauseCircle /> : <PlayCircle />}
        >
          {isPlaying ? 'Pausar' : 'Reproduzir'}
        </Button>

        {/* Indicadores de Slide */}
        <Box sx={{ display: 'flex', ml: 2 }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: index === currentSlide 
                  ? 'primary.main' 
                  : 'grey.400',
                mx: 0.5,
                cursor: 'pointer'
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Slideshow;