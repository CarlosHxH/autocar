"use client"
import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    IconButton
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon
} from '@mui/icons-material';

// React Use Cart Integration
import { useCart } from 'react-use-cart';

// Product Interface
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
}

// Mock Products (Replace with actual data)
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'High-Performance Auto Part',
        price: 299.99,
        image: '/product-image-1.jpg',
        description: 'Advanced automotive component'
    },
    {
        id: '2',
        name: 'Premium Brake Pads',
        price: 199.99,
        image: '/product-image-2.jpg',
        description: 'High-quality brake system upgrade'
    }
];

// Checkout Form Component
const CheckoutForm: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'credit'
    });

    const {
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
        emptyCart
    } = useCart();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement checkout logic
        console.log('Checkout Data:', { items, formData });
        // Additional checkout processing would go here
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3
                }}
            >
                <CartIcon sx={{ mr: 2 }} /> Finalizar Compra
            </Typography>

            <Grid container spacing={4}>
                {/* Cart Items */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Itens do Carrinho
                        </Typography>
                        {items.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center">
                                Seu carrinho está vazio
                            </Typography>
                        ) : (
                            items.map((item) => (
                                <Card
                                    key={item.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 2,
                                        p: 2
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            objectFit: 'contain',
                                            marginRight: 16
                                        }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            R$ {item.price.toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => updateItemQuantity(item.id, (item.quantity || 1) - 1)}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 2 }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => updateItemQuantity(item.id, (item.quantity || 1) + 1)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            ))
                        )}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 2
                        }}>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={emptyCart}
                            >
                                Limpar Carrinho
                            </Button>
                            <Typography variant="h6">
                                Total: R$ {cartTotal.toFixed(2)}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* Checkout Form */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Informações de Entrega
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Nome"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Sobrenome"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Endereço"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Cidade"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="CEP"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Método de Pagamento</InputLabel>
                                        <Select
                                            name="paymentMethod"
                                            value={formData.paymentMethod}
                                            label="Método de Pagamento"
                                            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                                        >
                                            <MenuItem value="credit">Cartão de Crédito</MenuItem>
                                            <MenuItem value="debit">Cartão de Débito</MenuItem>
                                            <MenuItem value="pix">PIX</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        disabled={items.length === 0}
                                    >
                                        Finalizar Compra
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Wrapper Component with CartProvider
const CheckoutPage: React.FC = () => {
    return (
        <CheckoutForm />
    );
};

// Example of adding products to cart
const AddToCartButton: React.FC<{ product: Product }> = ({ product }) => {
    const { addItem } = useCart();

    return (
        <Button
            variant="contained"
            onClick={() => addItem(product)}
        >
            Adicionar ao Carrinho
        </Button>
    );
};

export default CheckoutPage;
//npm install //react-use-cart @mui/material @mui/icons-material @emotion/react @emotion/styled