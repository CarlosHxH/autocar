

// Interface para os produtos
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  code: string;
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
  isPromotion?: boolean;
}

// Mock Product Data (replace with actual API call)
export const mockProducts: Product[] = [{
  id: '1',
  name: 'Volante Esportivo Polo Fox Voyage Gol G2 G3 G4 Santana Parati Gol G7 Golf Tsi Vw - Cubo de Volante - Magazine Canaltechbr',
  image: 'https://cdn.iset.io/assets/02462/produtos/3743/16022016132004_zoom.jpg',
  price: 299.99,
  description: 'Advanced automotive component designed for optimal performance and durability. Engineered with precision to enhance your vehicle\'s efficiency and reliability.',
  images: [
    'https://down-br.img.susercontent.com/file/br-11134207-7qukw-lg2oivljlawveb',
    'https://cdn.iset.io/assets/02462/produtos/3743/16022016132004_zoom.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qC4OvOR6B1ldvJszDNZ96QiiTSbXfchr4hkEGhwvszXNZKYEvWTm3WJyjacGScQFP7s&usqp=CAU'
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
  ],
  category: "",
  code: "",
}, {
  id: '2',
  name: 'Kit Borrachas Vedação Universal',
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
  ],
  category: "",
  code: "",
  isPromotion: true
}, {
  id: '3',
  name: 'Kit Embreagem Renault Master',
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
  ],
  category: "",
  code: ""
}, {
  id: '4',
  name: 'Escape Esportivo Traseiro Gol G5 G6 G7',
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
  ],
  category: "",
  code: "",
  isPromotion: true
}, {
  id: '5',
  name: 'Filtro de Ar Tecfil Arl4161',
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
  ],
  category: "",
  code: ""
}, {
  id: '6',
  name: 'Filtro de Ar Esportivo Mono Fluxo Preto Polo Fox Voyage G5 G6 G7',
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
  ],
  category: "",
  code: "",
  isPromotion: true
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



/*
// Product Interface
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
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
}*/
/*
// Mock Product Data (replace with actual API call)
export const mockProduct: Product = {
  id: '1',
  name: 'High-Performance Auto Part',
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
};*/



/*
// Dados de exemplo de produtos
export const autoPartsProducts: Product[] = [
  {
    id: '1',
    name: 'Filtro de Óleo Original',
    category: 'Filtros',
    code: 'FO-12345',
    price: 49.90,
    image: 'https://cdn.awsli.com.br/600x450/1040/1040621/produto/64211070/6ab6da10cb.jpg',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {},
  },
  {
    id: '2',
    name: 'Pastilha de Freio Dianteira',
    category: 'Freios',
    code: 'PF-78945',
    price: 129.90,
    image: 'https://motobr.vtexassets.com/arquivos/ids/237696-800-auto?v=637932301411000000&width=800&height=auto&aspect=true',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {}
  },
  {
    id: '3',
    name: 'Amortecedor Traseiro',
    category: 'Suspensão',
    code: 'AT-65432',
    price: 349.90,
    image: 'https://josecar-maverick-produtos.s3.amazonaws.com/loja/imagens/full/334048par.jpg',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {}
  },
  {
    id: '4',
    name: 'Bateria 60Ah',
    category: 'Elétrica',
    code: 'BAT-60A',
    price: 399.90,
    image: 'https://lojaodasbaterias.com/wp-content/uploads/2021/08/M60AD-1.png',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {}
  },
  {
    id: '5',
    name: 'Correia Dentada',
    category: 'Motor',
    code: 'CD-34567',
    price: 89.90,
    image: 'https://www.lyonparts.com.br/img/products/kit-correia-dentada-citroen-c3-15-8v-todos_1_1200.jpg',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {}
  },
  {
    id: '6',
    name: 'Vela de Ignição',
    category: 'Motor',
    code: 'VI-11223',
    price: 29.90,
    image: 'https://static.autopecasmarques.com.br/public/marquesautopecas/imagens/produtos/jogo-vela-ignicao-ngk-apollo-gol-parati-saveiro-voyage-6351670b817e1.jpg',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {}
  },
  {
    id: '7',
    name: 'Óleo Motor 5W30 Sintético 1L',
    category: 'Lubrificantes',
    code: 'OM-5W30',
    price: 39.90,
    image: 'https://static.autopecasmarques.com.br/public/marquesautopecas/imagens/produtos/oleo-motor-5w30-dexos-sintetico-mobil-d1-lubrificante-1-l-63515f1ed927f.jpg',
    description: "",
    images: [],
    rating: 0,
    inStock: false,
    specifications: {}
  },
];
*/
