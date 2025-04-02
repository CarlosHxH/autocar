import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
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
  })
  console.log({ user })
  
  // Clear existing data to avoid duplicates (optional)
  await prisma.productVariant.deleteMany({});
  await prisma.productSpecification.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.product.deleteMany({});

  const products = [
    {
      id: '1',
      name: 'Volante Esportivo Polo Fox Voyage Gol G2 G3 G4 Santana Parati Gol G7 Golf Tsi Vw - Cubo de Volante - Magazine Canaltechbr',
      price: 299.99,
      description: 'Advanced automotive component designed for optimal performance and durability. Engineered with precision to enhance your vehicle\'s efficiency and reliability.',
      mainImage: 'https://cdn.iset.io/assets/02462/produtos/3743/16022016132004_zoom.jpg',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: '',
      code: '',
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
      id: '2',
      name: 'Kit Borrachas Vedação Universal',
      price: 199.99,
      description: 'High-quality brake system upgrade',
      mainImage: 'https://www.aracacentercar.com.br/fx-files/images/big/plgProducts-vo1yp5lyf0.jpg',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: '',
      code: '',
      isPromotion: true,
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
        'https://placehold.co/600x400?text=product1',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      id: '3',
      name: 'Kit Embreagem Renault Master',
      price: 199.99,
      description: 'High-quality brake system upgrade',
      mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt8n930KKHO17MQaFowVgJJvkvmXT6hVzUWQ&s',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: '',
      code: '',
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
        'https://placehold.co/600x400?text=product1',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      id: '4',
      name: 'Escape Esportivo Traseiro Gol G5 G6 G7',
      price: 199.99,
      description: 'High-quality brake system upgrade',
      mainImage: 'https://http2.mlstatic.com/D_NQ_NP_625710-MLB71281640981_082023-O-escapamento-silencioso-traseiro-gol-g5-g6-10-2008-em-diante.webp',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: '',
      code: '',
      isPromotion: true,
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
        'https://placehold.co/600x400?text=product1',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      id: '5',
      name: 'Filtro de Ar Tecfil Arl4161',
      price: 199.99,
      description: 'High-quality brake system upgrade',
      mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAn-ScxJ7tBm3H9DhOjfqpVOz6SDV-Re3HHA&s',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: '',
      code: '',
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
        'https://placehold.co/600x400?text=product1',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    },
    {
      id: '6',
      name: 'Filtro de Ar Esportivo Mono Fluxo Preto Polo Fox Voyage G5 G6 G7',
      price: 199.99,
      description: 'High-quality brake system upgrade',
      mainImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9G4dN6WnoUCplOqFk6Yh-Pe3XbY64bgAUaw&s',
      rating: 4.5,
      inStock: true,
      discount: 15,
      category: '',
      code: '',
      isPromotion: true,
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
        'https://placehold.co/600x400?text=product1',
        'https://placehold.co/600x400?text=product2',
        'https://placehold.co/600x400?text=product3'
      ]
    }
  ];

  for (const product of products) {
    // Create the product
    const createdProduct = await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        mainImage: product.mainImage,
        rating: product.rating,
        inStock: product.inStock,
        discount: product.discount,
        category: product.category,
        code: product.code,
        isPromotion: product.isPromotion ?? false,
      },
    });

    // Create specifications
    for (const spec of product.specifications) {
      await prisma.productSpecification.create({
        data: {
          key: spec.key,
          value: spec.value,
          productId: product.id,
        },
      });
    }

    // Create variants
    for (const variant of product.variants) {
      await prisma.productVariant.create({
        data: {
          color: variant.color,
          size: variant.size,
          productId: product.id,
        },
      });
    }

    // Create additional images
    for (const imageUrl of product.images) {
      // Skip the main image if it's in the images array to avoid duplication
      if (imageUrl !== product.mainImage) {
        await prisma.productImage.create({
          data: {
            url: imageUrl,
            productId: product.id,
          },
        });
      }
    }
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });