
// Product Interface
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  rating: number;
  inStock: boolean;
  discount?: number;
  specifications: { [key: string]: string };
  variants?: {
    color?: string;
    size?: string;
    price?: number
  }[];
}

// Mock Product Data (replace with actual API call)
export const mockProducts: Product[] = [{
  id: '1',
  name: 'High-Performance Auto Part',
  image: 'https://www.loboexplorador.com.br/wp-content/uploads/2023/04/LAMINA-DE-BORRACHA-PARA-RODO-LIMPA-VIDROS-35CM-ERGOTEC-UNGER-1.webp',
  price: 299.99,
  description: 'Advanced automotive component designed for optimal performance and durability. Engineered with precision to enhance your vehicle\'s efficiency and reliability.',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
}, {
  id: '2',
  name: 'Premium Brake Pads',
  price: 199.99,
  image: 'https://www.aracacentercar.com.br/fx-files/images/big/plgProducts-vo1yp5lyf0.jpg',
  description: 'High-quality brake system upgrade',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
}, {
  id: '3',
  name: 'Premium Brake Pads',
  price: 199.99,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8n930KKHO17MQaFowVgJJvkvmXT6hVzUWQ&s',
  description: 'High-quality brake system upgrade',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
}, {
  id: '4',
  name: 'Premium Brake Pads',
  price: 199.99,
  image: 'https://http2.mlstatic.com/D_NQ_NP_625710-MLB71281640981_082023-O-escapamento-silencioso-traseiro-gol-g5-g6-10-2008-em-diante.webp',
  description: 'High-quality brake system upgrade',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
}, {
  id: '5',
  name: 'Premium Brake Pads',
  price: 199.99,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAn-ScxJ7tBm3H9DhOjfqpVOz6SDV-Re3HHA&s',
  description: 'High-quality brake system upgrade',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
}, {
  id: '6',
  name: 'Premium Brake Pads',
  price: 199.99,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G4dN6WnoUCplOqFk6Yh-Pe3XbY64bgAUaw&s',
  description: 'High-quality brake system upgrade',
  images: [
    'https://placehold.co/600x400?text=product1',
    'https://placehold.co/600x400?text=product2',
    'https://placehold.co/600x400?text=product3'
  ],
  rating: 4.5,
  inStock: true,
  discount: 15,
  specifications: {
    'Material': 'High-Grade Aluminum',
    'Compatibility': 'Universal Fit',
    'Warranty': '2 Years',
    'Weight': '2.5 kg'
  },
  variants: [
    { color: 'Silver', size: 'Standard' },
    { color: 'Black', size: 'Large' }
  ]
}
];

export interface userType {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
}

export const credencialSignin = (email:string | unknown) => {
  if(!email) return null;
  const users:userType[] = [{
    id: '1',
    name: 'Admin',
    email: 'demo@mui.com',
    password: '$2b$12$eCbIKKOw2Qq8S4PsBZny8.tBKYar2QyHMOJFSa9E1L5juTOdsEnVy',
    role: 'admin',
    image: 'https://avatars.githubusercontent.com/u/110472397?v=4&size=64'
  },{
    id: '2',
    name: 'User',
    email: 'a@a.a',
    password: "$2b$12$6oyERCu1LZyo.MbTsuDLG.Azr2dy2rabGHieg2X8Krav.283xczZC",
    role: 'user',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHs2KDQ4KvjQlwWm37aszNWM73KvZ562O3yQ&s'
  }];
  return users.find((user) => user.email === email) || null;
}