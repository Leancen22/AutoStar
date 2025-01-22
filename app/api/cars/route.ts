import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        createdAt: 'desc' // Obtener los más recientes primero
      }
    });
    
    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Error fetching cars' },
      { status: 500 }
    );
  }
}