// src/components/Cart.tsx
import React from 'react';
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Divider, ButtonGroup, TextField } from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useCart } from 'react-use-cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function Cart({ open, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const { cartTotal } = useCart()
  // const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Meu Carrinho ({items.length})</Typography>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {items.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Seu carrinho está vazio
          </Typography>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{ backgroundColor: '#1a237e', '&:hover': { backgroundColor: '#000051' } }}
          >
            Continuar Comprando
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflow: 'auto', mt: 5 }}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <ButtonGroup size="small" sx={{ mb: 1 }}>
                        <Button onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                          <RemoveIcon fontSize="small" />
                        </Button>
                        <Button disabled variant="outlined">{item.quantity}</Button>
                        <Button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}><AddIcon fontSize="small" /></Button>
                      </ButtonGroup>
                      <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(item.id)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                  disablePadding
                >
                  <ListItemAvatar>
                    <Avatar variant="rounded" src={item.image} alt={item.name} sx={{ width: 60, height: 60, mr: 1 }} />
                  </ListItemAvatar>
                  <ListItemText id={item.id} primary={item.name} secondary={`R$ ${item.price.toFixed(2)}`} sx={{ ml: 1, maxWidth:200 }} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Subtotal:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                R$ {cartTotal.toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Frete:</Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                Calculado no checkout
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" fontWeight="bold">
                R$ {cartTotal.toFixed(2)}
              </Typography>
            </Box>
            <Button variant="contained" fullWidth size="large" sx={{ backgroundColor: '#1a237e', '&:hover': { backgroundColor: '#000051' } }}>
              Finalizar Compra
            </Button>
            <Button variant="outlined" fullWidth size="large" sx={{ mt: 1, borderColor: '#1a237e', color: '#1a237e' }} onClick={onClose}>
              Continuar Comprando
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
}