import Tabs from "./Tabs";
import Gallery from "./Gallery";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type Params = Promise<{ id: string }>;

// Obtener los IDs de todos los coches para generación estática


async function getCar(id: string) {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: parseInt(id)
      },
    });
    console.log('Prisma getCar result:', JSON.stringify(car, null, 2));
    return car;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}


export default async function CarDetails({ params }: { params: Params }) {
  const { id } = await params;
  const car = await getCar(id);
  

  console.log(car)
  if (!car) {
    notFound();
  }

  return (
    <section className="py-16 bg-gray-100">
      <Link 
        href={`/catalogo`} 
        className="container mx-auto px-4 inline-block text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-300 flex items-center"
        >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-2"
        >
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Volver al Catálogo
      </Link>
      <div className="container mx-auto px-4">
        {/* Imagen y Descripción */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="md:w-2/5 h-80 md:h-auto relative">
            <img
              src={car.image}
              alt={car.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-between md:w-3/5">
            <div>
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl font-bold">{car.title}</h1>
                <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded">
                  {car.tag}
                </span>
              </div>
              <p className="text-gray-700 text-lg mb-4">{car.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="font-medium">{car.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Año</p>
                  <p className="font-medium">{car.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Kilometraje</p>
                  <p className="font-medium">{car.km.toLocaleString()} Km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Categoría</p>
                  <p className="font-medium">{car.category}</p>
                </div>
              </div>
              <p className="text-2xl font-semibold text-indigo-600">
                ${car.price.toLocaleString()}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <button className="flex-1 rounded bg-indigo-600 px-8 py-4 text-lg font-medium text-white hover:bg-indigo-700 transition">
                Contáctanos
              </button>
              <button className="flex-1 rounded border-2 border-indigo-600 px-8 py-4 text-lg font-medium text-indigo-600 hover:bg-indigo-50 transition">
                Agendar test drive
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs car={car} />

        {/* Galería */}
        {car.youtubeUrl?.length > 0 && car.gallery.length > 0 && (
          <Gallery gallery={car.gallery} youtubeURL={car.youtubeUrl} financingOptions={car.financingOptions} />
        )}
      </div>
    </section>
  );
}