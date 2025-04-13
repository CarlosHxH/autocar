'use client';
import * as React from 'react';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Copyright from '@/src/components/Copyright';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import Cart from './Cart';
import { CartProvider, useCart } from 'react-use-cart';
import Image from 'next/image';


function toolbarActions() {
  const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
  const [totalItems, setTotalItems] = React.useState<number | null>(null);
  const { items, totalItems: total, removeItem, updateItemQuantity } = useCart();

  // Update cart count when component mounts or cart changes
  React.useEffect(() => { setTotalItems(total) }, [total]);
  const handleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <Stack direction="row">
      <IconButton aria-label="cart" onClick={handleCart}>
        <Badge aria-label="cart" color="error" badgeContent={totalItems || 0} showZero>
          <ShoppingCart />
        </Badge>
      </IconButton>
      <Cart
        open={isCartOpen}
        onClose={handleCart}
        items={items as any}
        onUpdateQuantity={updateItemQuantity}
        onRemoveItem={removeItem}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

function appTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Image src={"/logo.png"} width={120} height={30} alt={"Loogo"} style={{ width: 'auto' }} />
      <Chip size="small" label="BETA" color="info" sx={{ display: { xs: 'none', sm: 'block' } }} />
      <Tooltip title="Connected to production" sx={{ display: { xs: 'none', sm: 'block' } }}>
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <DashboardLayout hideNavigation slots={{ appTitle, toolbarActions }}>
        <PageContainer>
          {props.children}
        </PageContainer>
      </DashboardLayout>
    </CartProvider>
  );
}
