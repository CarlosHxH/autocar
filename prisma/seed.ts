import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates and foreign key conflicts
  await prisma.bannerImages.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productSpecification.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.footer.deleteMany({});
  
  // Create admin user
  const user = await prisma.user.upsert({
    where: { email: 'admin@prisma.io' },
    update: {
      name: 'Admin',
      email: 'admin@prisma.io',
      password: bcrypt.hashSync('admin', 12),
      role: 'ADMIN',
      image:'https://avatars.githubusercontent.com/u/110472397?v=4&size=40'
    },
    create: {
      name: 'Admin',
      email: 'admin@prisma.io',
      password: bcrypt.hashSync('admin', 12),
      role: 'ADMIN',
      image:'https://avatars.githubusercontent.com/u/110472397?v=4&size=40'
    },
  });
  console.log({ user });

  const products = [
    {
      name: 'Volante Esportivo Polo Fox Voyage Gol G2 G3 G4 Santana Parati Gol G7 Golf Tsi Vw',
      price: 299.99,
      description: 'Advanced automotive component designed for optimal performance and durability. Engineered with precision to enhance your vehicle\'s efficiency and reliability.',
      image: 'https://cdn.iset.io/assets/02462/produtos/3743/16022016132004_zoom.jpg',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: 'Volantes',
      code: 'VLT-001',
      isPromotion: false,
      specifications: [
        { key: 'Material', value: 'High-Grade Aluminum' },
        { key: 'Compatibility', value: 'Universal Fit' },
        { key: 'Warranty', value: '2 Years' },
        { key: 'Weight', value: '2.5 kg' }
      ],
      variants: [
        { color: 'Silver', size: 'Standard' },
        { color: 'Black', size: 'Large' }
      ],
      images: [
        'https://down-br.img.susercontent.com/file/br-11134207-7qukw-lg2oivljlawveb',
        'https://cdn.iset.io/assets/02462/produtos/3743/16022016132004_zoom.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5qC4OvOR6B1ldvJszDNZ96QiiTSbXfchr4hkEGhwvszXNZKYEvWTm3WJyjacGScQFP7s&usqp=CAU'
      ]
    },
    {
      name: 'Kit Borrachas Vedação Universal',
      price: 199.99,
      description: 'High-quality universal sealing rubber kit for multiple applications.',
      image: 'https://www.aracacentercar.com.br/fx-files/images/big/plgProducts-vo1yp5lyf0.jpg',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: 'Vedação',
      code: 'VED-002',
      isPromotion: true,
      specifications: [
        { key: 'Material', value: 'Rubber' },
        { key: 'Compatibility', value: 'Universal Fit' },
        { key: 'Warranty', value: '1 Year' },
        { key: 'Package Includes', value: '10 pieces' }
      ],
      variants: [
        { color: 'Black', size: 'Standard' },
        { color: 'Black', size: 'Large' }
      ],
      images: [
        'https://www.aracacentercar.com.br/fx-files/images/big/plgProducts-vo1yp5lyf0.jpg',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      name: 'Kit Embreagem Renault Master',
      price: 399.99,
      description: 'Complete clutch kit for Renault Master vehicles, offering smooth gear transitions and extended durability.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8n930KKHO17MQaFowVgJJvkvmXT6hVzUWQ&s',
      rating: 4.7,
      inStock: true,
      discount: 10,
      category: 'Embreagem',
      code: 'EMB-003',
      isPromotion: false,
      specifications: [
        { key: 'Vehicle Compatibility', value: 'Renault Master' },
        { key: 'Components', value: 'Pressure Plate, Clutch Disc, Release Bearing' },
        { key: 'Warranty', value: '2 Years' },
        { key: 'Origin', value: 'Genuine Parts' }
      ],
      variants: [
        { color: 'Silver', size: 'Standard' }
      ],
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8n930KKHO17MQaFowVgJJvkvmXT6hVzUWQ&s',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      name: 'Escape Esportivo Traseiro Gol G5 G6 G7',
      price: 249.99,
      description: 'Performance sport exhaust for Volkswagen Gol G5, G6, and G7 models, delivering enhanced sound and improved throttle response.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_625710-MLB71281640981_082023-O-escapamento-silencioso-traseiro-gol-g5-g6-10-2008-em-diante.webp',
      rating: 4.3,
      inStock: true,
      discount: 15,
      category: 'Escapamento',
      code: 'ESC-004',
      isPromotion: true,
      specifications: [
        { key: 'Material', value: 'Stainless Steel' },
        { key: 'Compatibility', value: 'Volkswagen Gol G5, G6, G7' },
        { key: 'Warranty', value: '1 Year' },
        { key: 'Installation Type', value: 'Bolt-on' }
      ],
      variants: [
        { color: 'Chrome', size: 'Standard' },
        { color: 'Black', size: 'Standard' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_625710-MLB71281640981_082023-O-escapamento-silencioso-traseiro-gol-g5-g6-10-2008-em-diante.webp',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      name: 'Filtro de Ar Tecfil Arl4161',
      price: 59.99,
      description: 'High-performance air filter ensuring optimal engine breathing and protection from contaminants.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAn-ScxJ7tBm3H9DhOjfqpVOz6SDV-Re3HHA&s',
      rating: 4.8,
      inStock: true,
      discount: 5,
      category: 'Filtro',
      code: 'FLT-005',
      isPromotion: false,
      specifications: [
        { key: 'Brand', value: 'Tecfil' },
        { key: 'Model', value: 'ARL4161' },
        { key: 'Compatibility', value: 'Multiple Models' },
        { key: 'Filter Type', value: 'Air Filter' }
      ],
      variants: [
        { color: 'White', size: 'Standard' }
      ],
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAn-ScxJ7tBm3H9DhOjfqpVOz6SDV-Re3HHA&s',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      name: 'Filtro de Ar Esportivo Mono Fluxo Preto Polo Fox Voyage G5 G6 G7',
      price: 129.99,
      description: 'Sport performance air filter offering increased airflow and improved engine response for Volkswagen models.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G4dN6WnoUCplOqFk6Yh-Pe3XbY64bgAUaw&s',
      rating: 4.6,
      inStock: true,
      discount: 20,
      category: 'Filtro',
      code: 'FLT-006',
      isPromotion: true,
      specifications: [
        { key: 'Material', value: 'High-flow cotton gauze' },
        { key: 'Flow Type', value: 'Mono Flow' },
        { key: 'Compatibility', value: 'Polo, Fox, Voyage G5 G6 G7' },
        { key: 'Color', value: 'Black' }
      ],
      variants: [
        { color: 'Black', size: 'Standard' },
        { color: 'Red', size: 'Standard' }
      ],
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G4dN6WnoUCplOqFk6Yh-Pe3XbY64bgAUaw&s',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      name: 'Amortecedor Dianteiro Gol G5 G6 G7',
      price: 349.99,
      description: 'Amortecedor dianteiro de alta performance para Gol G5, G6 e G7, proporcionando conforto e estabilidade.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_608357-MLB46516556601_062021-O.webp',
      rating: 4.4,
      inStock: true,
      discount: 12,
      category: 'Suspensão',
      code: 'SUS-007',
      isPromotion: false,
      specifications: [
        { key: 'Posição', value: 'Dianteiro' },
        { key: 'Compatibility', value: 'Gol G5, G6, G7' },
        { key: 'Warranty', value: '18 meses' },
        { key: 'Tipo', value: 'Hidráulico' }
      ],
      variants: [
        { color: 'Preto', size: 'Padrão' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_608357-MLB46516556601_062021-O.webp',
        'https://placehold.co/600x400?text=Amortecedor2',
        'https://placehold.co/600x400?text=Amortecedor3'
      ]
    },
    {
      name: 'Farol Dianteiro Polo 2009-2014',
      price: 459.99,
      description: 'Farol dianteiro original para Polo 2009-2014 com lente cristalina e acabamento premium.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_798752-MLB47250090017_082021-O.webp',
      rating: 4.7,
      inStock: true,
      discount: 8,
      category: 'Iluminação',
      code: 'ILU-008',
      isPromotion: true,
      specifications: [
        { key: 'Tipo', value: 'Farol dianteiro' },
        { key: 'Compatibility', value: 'Polo 2009-2014' },
        { key: 'Lente', value: 'Cristalina' },
        { key: 'Inclui', value: 'Lâmpadas H7' }
      ],
      variants: [
        { color: 'Preto', size: 'Direito' },
        { color: 'Preto', size: 'Esquerdo' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_798752-MLB47250090017_082021-O.webp',
        'https://placehold.co/600x400?text=Farol2',
        'https://placehold.co/600x400?text=Farol3'
      ]
    },
    {
      name: 'Bateria Moura 60Ah M60',
      price: 599.99,
      description: 'Bateria automotiva de alta performance com 60Ah, ideal para veículos nacionais e importados.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_841787-MLB44799774483_022021-O.webp',
      rating: 4.9,
      inStock: true,
      discount: 5,
      category: 'Elétrica',
      code: 'ELE-009',
      isPromotion: false,
      specifications: [
        { key: 'Capacidade', value: '60Ah' },
        { key: 'Tensão', value: '12V' },
        { key: 'Polaridade', value: 'Direita' },
        { key: 'Garantia', value: '24 meses' }
      ],
      variants: [
        { color: 'Azul', size: 'Padrão' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_841787-MLB44799774483_022021-O.webp',
        'https://placehold.co/600x400?text=Bateria2',
        'https://placehold.co/600x400?text=Bateria3'
      ]
    },
    {
      name: 'Pastilha de Freio Dianteira Cerâmica',
      price: 189.99,
      description: 'Pastilhas de freio cerâmicas de alta performance, oferecendo maior durabilidade e menor ruído.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_842075-MLB53500571574_012022-O.webp',
      rating: 4.6,
      inStock: true,
      discount: 15,
      category: 'Freios',
      code: 'FR-010',
      isPromotion: true,
      specifications: [
        { key: 'Material', value: 'Cerâmica' },
        { key: 'Posição', value: 'Dianteira' },
        { key: 'Compatibility', value: 'Vários modelos' },
        { key: 'Garantia', value: '1 ano' }
      ],
      variants: [
        { color: 'Cinza', size: 'Padrão' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_842075-MLB53500571574_012022-O.webp',
        'https://placehold.co/600x400?text=Pastilha2',
        'https://placehold.co/600x400?text=Pastilha3'
      ]
    },
    {
      name: 'Radiador de Alumínio Gol 1.0',
      price: 429.99,
      description: 'Radiador em alumínio para Gol 1.0, com maior eficiência térmica e resistência.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_649366-MLB49368934241_032022-O.webp',
      rating: 4.5,
      inStock: true,
      discount: 10,
      category: 'Refrigeração',
      code: 'REF-011',
      isPromotion: false,
      specifications: [
        { key: 'Material', value: 'Alumínio' },
        { key: 'Compatibility', value: 'Gol 1.0' },
        { key: 'Garantia', value: '2 anos' },
        { key: 'Núcleo', value: 'Dupla linha' }
      ],
      variants: [
        { color: 'Prata', size: 'Padrão' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_649366-MLB49368934241_032022-O.webp',
        'https://placehold.co/600x400?text=Radiador2',
        'https://placehold.co/600x400?text=Radiador3'
      ]
    },
    {
      name: 'Kit Correia Dentada + Tensor',
      price: 279.99,
      description: 'Kit completo com correia dentada e tensor para diversos modelos de veículos.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_965369-MLB53500571575_012022-O.webp',
      rating: 4.8,
      inStock: true,
      discount: 0,
      category: 'Motor',
      code: 'MOT-012',
      isPromotion: false,
      specifications: [
        { key: 'Componentes', value: 'Correia dentada + tensor' },
        { key: 'Compatibility', value: 'Vários modelos' },
        { key: 'Material', value: 'Borracha reforçada' },
        { key: 'Garantia', value: '1 ano' }
      ],
      variants: [
        { color: 'Preto', size: 'Padrão' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_965369-MLB53500571575_012022-O.webp',
        'https://placehold.co/600x400?text=Correia2',
        'https://placehold.co/600x400?text=Correia3'
      ]
    },
    {
      name: 'Sensor de Estacionamento Traseiro',
      price: 159.99,
      description: 'Kit com 4 sensores de estacionamento traseiro com display LCD e alarme sonoro.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_853385-MLB46516556602_062021-O.webp',
      rating: 4.3,
      inStock: true,
      discount: 0,
      category: 'Acessórios',
      code: 'ACE-013',
      isPromotion: false,
      specifications: [
        { key: 'Quantidade', value: '4 sensores' },
        { key: 'Cor', value: 'Preto' },
        { key: 'Alarme', value: 'Sonoro e visual' },
        { key: 'Instalação', value: 'Universal' }
      ],
      variants: [
        { color: 'Preto', size: 'Padrão' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_853385-MLB46516556602_062021-O.webp',
        'https://placehold.co/600x400?text=Sensor2',
        'https://placehold.co/600x400?text=Sensor3'
      ]
    },
    {
      name: 'Central Multimídia Android 10"',
      price: 899.99,
      description: 'Central multimídia Android com tela de 10", GPS, Bluetooth e entrada para câmera ré.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_798752-MLB47250090017_082021-O.webp',
      rating: 4.7,
      inStock: true,
      discount: 0,
      category: 'Multimídia',
      code: 'MUL-014',
      isPromotion: false,
      specifications: [
        { key: 'Sistema', value: 'Android 10' },
        { key: 'Tela', value: '10" touchscreen' },
        { key: 'Conexões', value: 'Bluetooth, USB, Wi-Fi' },
        { key: 'Compatibility', value: 'Universal' }
      ],
      variants: [
        { color: 'Preto', size: '2 DIN' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_798752-MLB47250090017_082021-O.webp',
        'https://placehold.co/600x400?text=Multimidia2',
        'https://placehold.co/600x400?text=Multimidia3'
      ]
    },
    {
      name: 'Limpador Parabrisa Dianteiro Bosch Aerotwin',
      price: 89.90,
      description: 'Palhetas de alta performance com tecnologia aerodinâmica para limpeza silenciosa e eficiente.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_842075-MLB53500571574_012022-O.webp',
      rating: 4.8,
      inStock: true,
      discount: 10,
      category: 'Acessórios',
      code: 'ACE-015',
      isPromotion: true,
      specifications: [
        { key: 'Marca', value: 'Bosch' },
        { key: 'Modelo', value: 'Aerotwin' },
        { key: 'Comprimento', value: '24" + 18"' },
        { key: 'Garantia', value: '6 meses' }
      ],
      variants: [
        { color: 'Preto', size: '24/18' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_842075-MLB53500571574_012022-O.webp',
        'https://placehold.co/600x400?text=Limpador2',
        'https://placehold.co/600x400?text=Limpador3'
      ]
    },
    {
      name: 'Óleo Motor Mobil Super 3000 5W30',
      price: 129.90,
      description: 'Óleo sintético de alta performance para motores modernos, garantindo melhor proteção e desempenho.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_965369-MLB53500571575_012022-O.webp',
      rating: 4.9,
      inStock: true,
      discount: 15,
      category: 'Lubrificantes',
      code: 'LUB-016',
      isPromotion: false,
      specifications: [
        { key: 'Viscosidade', value: '5W30' },
        { key: 'Tipo', value: 'Sintético' },
        { key: 'Litragem', value: '1L' },
        { key: 'API', value: 'SN Plus' }
      ],
      variants: [
        { color: 'Dourado', size: '1L' },
        { color: 'Dourado', size: '4L' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_965369-MLB53500571575_012022-O.webp',
        'https://placehold.co/600x400?text=Oleo2',
        'https://placehold.co/600x400?text=Oleo3'
      ]
    },
    {
      name: 'Cabo Vela NGK Premium',
      price: 149.90,
      description: 'Cabos de vela de alta performance com blindagem eficiente contra interferências eletromagnéticas.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_853385-MLB46516556602_062021-O.webp',
      rating: 4.7,
      inStock: true,
      discount: 0,
      category: 'Ignição',
      code: 'IGN-017',
      isPromotion: false,
      specifications: [
        { key: 'Marca', value: 'NGK' },
        { key: 'Tipo', value: 'Premium' },
        { key: 'Resistência', value: '1kΩ/cm' },
        { key: 'Garantia', value: '1 ano' }
      ],
      variants: [
        { color: 'Azul', size: 'Conjunto' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_853385-MLB46516556602_062021-O.webp',
        'https://placehold.co/600x400?text=CaboVela2',
        'https://placehold.co/600x400?text=CaboVela3'
      ]
    },
    {
      name: 'Lanterna Traseira Gol G5 G6',
      price: 279.90,
      description: 'Lanterna traseira original para Gol G5 e G6, com acabamento perfeito e encaixe preciso.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_798752-MLB47250090017_082021-O.webp',
      rating: 4.5,
      inStock: true,
      discount: 20,
      category: 'Iluminação',
      code: 'ILU-018',
      isPromotion: true,
      specifications: [
        { key: 'Posição', value: 'Traseira' },
        { key: 'Lado', value: 'Direito/Esquerdo' },
        { key: 'Tipo', value: 'Original' },
        { key: 'Compatibilidade', value: 'Gol G5/G6' }
      ],
      variants: [
        { color: 'Vermelho', size: 'Direito' },
        { color: 'Vermelho', size: 'Esquerdo' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_798752-MLB47250090017_082021-O.webp',
        'https://placehold.co/600x400?text=Lanterna2',
        'https://placehold.co/600x400?text=Lanterna3'
      ]
    },
    {
      name: 'Disco Freio Dianteiro Brembo',
      price: 429.90,
      description: 'Discos de freio dianteiros Brembo de alta qualidade, oferecendo melhor frenagem e durabilidade.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_608357-MLB46516556601_062021-O.webp',
      rating: 4.8,
      inStock: true,
      discount: 12,
      category: 'Freios',
      code: 'FR-019',
      isPromotion: false,
      specifications: [
        { key: 'Marca', value: 'Brembo' },
        { key: 'Material', value: 'Aço carbono' },
        { key: 'Diâmetro', value: '276mm' },
        { key: 'Ventilação', value: 'Ventilado' }
      ],
      variants: [
        { color: 'Prata', size: '276mm' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_608357-MLB46516556601_062021-O.webp',
        'https://placehold.co/600x400?text=DiscoFreio2',
        'https://placehold.co/600x400?text=DiscoFreio3'
      ]
    },
    {
      name: 'Kit Suspensão Dianteira Completa',
      price: 899.90,
      description: 'Kit completo com amortecedores, molas, coxins e batentes para renovação total da suspensão.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_649366-MLB49368934241_032022-O.webp',
      rating: 4.6,
      inStock: true,
      discount: 18,
      category: 'Suspensão',
      code: 'SUS-020',
      isPromotion: true,
      specifications: [
        { key: 'Componentes', value: '4 peças' },
        { key: 'Posição', value: 'Dianteira' },
        { key: 'Garantia', value: '2 anos' },
        { key: 'Compatibilidade', value: 'Vários modelos' }
      ],
      variants: [
        { color: 'Vários', size: 'Conjunto' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_649366-MLB49368934241_032022-O.webp',
        'https://placehold.co/600x400?text=Suspensao2',
        'https://placehold.co/600x400?text=Suspensao3'
      ]
    },{
      name: 'Discos Freio Dianteiro Brembo',
      price: 429.90,
      description: 'Discos de freio dianteiros Brembo de alta qualidade, oferecendo melhor frenagem e durabilidade.',
      image: 'https://http2.mlstatic.com/D_NQ_NP_608357-MLB46516556601_062021-O.webp',
      rating: 4.8,
      inStock: true,
      discount: 12,
      category: 'Freios',
      code: 'FR-019',
      isPromotion: false,
      specifications: [
        { key: 'Marca', value: 'Brembo' },
        { key: 'Material', value: 'Aço carbono' },
        { key: 'Diâmetro', value: '276mm' },
        { key: 'Ventilação', value: 'Ventilado' }
      ],
      variants: [
        { color: 'Prata', size: '276mm' }
      ],
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_608357-MLB46516556601_062021-O.webp',
        'https://placehold.co/600x400?text=DiscoFreio2',
        'https://placehold.co/600x400?text=DiscoFreio3'
      ]
    },
    { 
      name: 'Pneus Michelin Pilot Sport 4s',
      price: 599.90,
      description: 'Pneus de alta performance para carros esportivos e luxuosos.',
      image: 'https://placehold.co/600x400?text=MichelinPilotSport4s',
      rating: 4.7,
      inStock: true,
      discount: 10,
      category: 'Pneus',
      code: 'PN-001',
      isPromotion: false,
      specifications: [
        { key: 'Marca', value: 'Michelin' },
        { key: 'Modelo', value: 'Pilot Sport 4s' },
        { key: 'Tipo', value: 'Pneu para carro' },
        { key: 'Diâmetro', value: '205/55R16' }
      ],
      variants: [
        { color: 'Prata', size: '205/55R16' }, 
        { color: 'Prata', size: '225/45R17' }
      ],
      images: [
        'https://placehold.co/600x400?text=PneusMichelin',
        'https://placehold.co/600x400?text=MichelinPilotSport4s2',
        'https://placehold.co/600x400?text=MichelinPilotSport4s3' 
      ]
    }
  ];

  for (const productData of products) {
    // Create product with auto-generated ID
    const createdProduct = await prisma.product.create({
      data: {
        id: await generateUniqueId(), // Generate a unique ID for each product
        name: productData.name,
        price: productData.price,
        description: productData.description,
        image: productData.image,
        rating: productData.rating,
        inStock: productData.inStock,
        discount: productData.discount,
        category: productData.category,
        code: productData.code,
        isPromotion: productData.isPromotion ?? false,
      },
    });

    console.log(`Created product: ${createdProduct.name} with ID: ${createdProduct.id}`);

    // Create specifications
    for (const spec of productData.specifications) {
      await prisma.productSpecification.create({
        data: {
          key: spec.key,
          value: spec.value,
          productId: createdProduct.id,
        },
      });
    }

    // Create variants
    for (const variant of productData.variants) {
      await prisma.productVariant.create({
        data: {
          color: variant.color,
          size: variant.size,
          productId: createdProduct.id,
        },
      });
    }

    // Create additional images
    for (const imageUrl of productData.images) {
      // Skip the main image if it's in the images array to avoid duplication
      if (imageUrl !== productData.image) {
        await prisma.productImage.create({
          data: {
            url: imageUrl,
            productId: createdProduct.id,
          },
        });
      }
    }
  }

  // Create banner images
  const banners = [
    {
      title: 'Summer Sale',
      description: 'Get up to 50% off on all summer items',
      images: 'https://barbosaautopecasguara.com.br/wp-content/uploads/2015/02/Banner-certo1.jpg',
    },
    {
      title: 'New Collection',
      description: 'Check out our latest arrivals for this season',
      images: 'https://serraf.com.br/wp-content/uploads/2023/10/Banner-Mobile-2-A-Melhor-Opcao.webp',
    },
    {
      title: 'Special Offers',
      description: 'Limited time deals on premium products',
      images: 'https://forteautopecas.com.br/Uploads/Imagens/2/banner-1.jpg?j_w',
    },
    {
      title: 'Free Delivery',
      description: 'Free shipping on all orders above $50',
      images: 'https://forteautopecas.com.br/Uploads/Imagens/3/banner-2.jpg?kfw',
    },
    {
      title: 'Holiday Season',
      description: 'Prepare for the holidays with our exclusive deals',
      images: 'https://superpecascaxias.com.br/assets/images/banner-peca-wv-3166x1107.jpg',
    }
  ];

  // Insert banners
  for (const banner of banners) {
    const result = await prisma.bannerImages.create({
      data: banner
    });
    console.log(`Created banner with ID: ${result.id}`);
  }

  // Cria os dados do footer
  const footer = await prisma.footer.create({
    data: {
      companyName: 'AUTO PEÇAS EXPRESS',
      companyDescription: 'Sua loja completa de auto peças com os melhores preços do mercado. Entrega para todo Brasil com rapidez e qualidade.',
      
      // Contato
      phone: '(11) 1234-5678',
      email: 'contato@autopecasexpress.com.br',
      address: 'Av. das Autopeças, 1000 - São Paulo/SP',
      
      // Horário de funcionamento
      weekdayHours: 'Segunda a Sexta: 08:00 - 18:00',
      saturdayHours: 'Sábado: 08:00 - 13:00',
      
      copyrightText: '© 2025 Auto Peças Express. Todos os direitos reservados.',
    },
  });
  console.log('Dados do footer:', footer);

  console.log('Seed completed successfully');
}

// Helper function to generate unique IDs for products
async function generateUniqueId() {
  // Create a simple sequential ID with a unique string prefix
  const timestamp = new Date().getTime().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `prod-${timestamp}-${random}`;
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });