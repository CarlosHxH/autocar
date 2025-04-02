import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates and foreign key conflicts
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.productSpecification.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});
  
  // Create admin user
  const user = await prisma.user.upsert({
    where: { email: 'admin@prisma.io' },
    update: {
      name: 'Admin',
      email: 'admin@prisma.io',
      password: bcrypt.hashSync('admin', 12),
      role: 'ADMIN',
    },
    create: {
      name: 'Admin',
      email: 'admin@prisma.io',
      password: bcrypt.hashSync('admin', 12),
      role: 'ADMIN',
    },
  });
  console.log({ user });

  const products = [
    {
      name: 'Volante Esportivo Polo Fox Voyage Gol G2 G3 G4 Santana Parati Gol G7 Golf Tsi Vw',
      price: 299.99,
      description: 'Advanced automotive component designed for optimal performance and durability. Engineered with precision to enhance your vehicle\'s efficiency and reliability.',
      mainImage: 'https://cdn.iset.io/assets/02462/produtos/3743/16022016132004_zoom.jpg',
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
      mainImage: 'https://www.aracacentercar.com.br/fx-files/images/big/plgProducts-vo1yp5lyf0.jpg',
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
      mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8n930KKHO17MQaFowVgJJvkvmXT6hVzUWQ&s',
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
      mainImage: 'https://http2.mlstatic.com/D_NQ_NP_625710-MLB71281640981_082023-O-escapamento-silencioso-traseiro-gol-g5-g6-10-2008-em-diante.webp',
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
      mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAn-ScxJ7tBm3H9DhOjfqpVOz6SDV-Re3HHA&s',
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
      mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G4dN6WnoUCplOqFk6Yh-Pe3XbY64bgAUaw&s',
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
        mainImage: productData.mainImage,
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
      if (imageUrl !== productData.mainImage) {
        await prisma.productImage.create({
          data: {
            url: imageUrl,
            productId: createdProduct.id,
          },
        });
      }
    }
  }

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