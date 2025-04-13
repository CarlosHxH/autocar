// src/types/index.ts
import { Product as PrismaProduct, BannerImages as PrismaBannerImages } from '@prisma/client';

// Definição do tipo Product com base no schema Prisma
export interface Product extends PrismaProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string | null;
  code: string | null;
  rating: number;
  inStock: boolean;
  discount: number;
  isPromotion: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

// Definição do tipo BannerImage com base no schema Prisma
export interface BannerImage extends PrismaBannerImages {
  id: string;
  title: string;
  description: string;
  images: string;
  createdAt: Date;
  updatedAt: Date;
}

// Definição do tipo CartItem para uso no carrinho
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount: number;
  totalPrice: number;
}

// Definição dos tipos para usuário
export interface User {
  id: string;
  email: string;
  name: string | null;
  role: Role;
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN'
}

// Definição do tipo para endereço
export interface Address {
  id: string;
  userId: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

// Definição do tipo para status do pedido
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Definição do tipo para pedido
export interface Order {
  id: string;
  userId: string;
  addressId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
}

// Definição do tipo para item do pedido
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
  description: string;
}