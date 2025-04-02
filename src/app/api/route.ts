import { prisma } from '@/prisma'
import { type NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {
  const data = await prisma.product.findMany();
  return NextResponse.json( data )
}
