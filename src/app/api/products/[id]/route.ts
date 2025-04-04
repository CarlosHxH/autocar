import { prisma } from '@/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
    const id = (await params).id;
    const data = await prisma.product.findUnique({
      where: {
        id: "prod-463193-4696"
      },
      include: {
        images: true,
        specifications: true,
        variants: true,
      },
    });
    
    if (!data) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
