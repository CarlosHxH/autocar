import prisma from '@/prisma'
import { type NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {
  const products = await prisma.product.findMany();
  const banners = await prisma.bannerImages.findMany();
  return NextResponse.json( { products, banners } )
}