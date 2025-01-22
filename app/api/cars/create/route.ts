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

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const carData: any = {};
    
    // Process form data
    for (const [key, value] of formData.entries()) {
      try {
        if (key === 'features' || key === 'specifications' || key === 'financingOptions') {
          carData[key] = JSON.parse(value as string);
        } else if (key === 'image' && value instanceof File) {
          console.log('Uploading main image...');
          carData[key] = await uploadToCloudinary(value);
        } else if (key === 'gallery' && value instanceof File) {
          if (!carData.gallery) {
            carData.gallery = [];
          }
          console.log('Uploading gallery image...');
          const galleryUrl = await uploadToCloudinary(value);
          carData.gallery.push(galleryUrl);
        } else if (key === 'youtubeUrl') {
          // Asegúrate de que video sea un array
          carData.youtubeUrl = value ? [value.toString()] : [];
        } else {
          carData[key] = value;
        }
      } catch (error) {
        console.error(`Error processing field ${key}:`, error);
        throw error;
      }
    }

    // Convert numeric fields
    carData.price = parseFloat(carData.price);
    carData.year = parseInt(carData.year);
    carData.km = parseInt(carData.km);

    console.log('Data to be saved:', carData);

    // Create the car in the database
    const car = await prisma.car.create({
      data: carData
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Error creating car', details: error },
      { status: 500 }
    );
  }
}