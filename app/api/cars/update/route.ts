import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Configurar cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadToCloudinary(file: File) {
    try {
      // Convertir el archivo a Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
  
      // Crear un dataURI
      const dataUri = `data:${file.type};base64,${buffer.toString('base64')}`;
  
      // Subir a Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(dataUri, {
        folder: 'cars', // Las imágenes se guardarán en una carpeta 'cars'
        resource_type: 'auto', // Detecta automáticamente el tipo de archivo
        transformation: { quality: 'auto' } // Optimización automática
      });
  
      return uploadResponse.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' }, 
        { status: 400 }
      );
    }

    const parsedId = parseInt(id.toString());

    const carData: any = {};
    
    for (const [key, value] of formData.entries()) {
      if (key !== 'id') {
        try {
          if (key === 'features' || key === 'specifications' || key === 'financingOptions') {
            carData[key] = value ? JSON.parse(value as string) : [];
          } else if (key === 'image' && value instanceof File) {
            carData[key] = await uploadToCloudinary(value);
          } else if (key === 'gallery' && value instanceof File) {
            if (!carData.gallery) {
              carData.gallery = [];
            }
            const galleryUrl = await uploadToCloudinary(value);
            carData.gallery.push(galleryUrl);
          } else if (value) {
            carData[key] = value;
          }
        } catch (processError) {
          console.log(`Error processing field ${key}:`, processError);
        }
      }
    }

    // Conversión de tipos
    if (carData.price) carData.price = parseFloat(carData.price);
    if (carData.year) carData.year = parseInt(carData.year);
    if (carData.km) carData.km = parseInt(carData.km);

    // Limpiar campos vacíos
    Object.keys(carData).forEach(key => {
      if (carData[key] === '' || carData[key] === null) {
        delete carData[key];
      }
    });

    console.log('Datos a actualizar:', carData);

    const car = await prisma.car.update({
      where: { id: parsedId },
      data: carData
    });

    return NextResponse.json(car, { status: 200 });
  } catch (error) {
    console.log('Error completo:', error);

    const errorResponse = {
      error: 'Error updating car',
      message: error instanceof Error 
        ? error.message 
        : (typeof error === 'string' 
            ? error 
            : 'Unknown error'),
      details: error instanceof Error ? error.stack : null
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}