"use client";

import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

interface CarItem {
  id: number;
  image: string;
  title: string;
  description: string;
  tag: string;
  price: number;
  category: string;
  model: string;
  year: number;
  km: number;
  features: string[];
  specifications: Record<string, string>;
  gallery: string[];
  financingOptions: any[];
  youtubeUrl?: string;
}

const CarouselGrid: React.FC = () => {
  const [items, setItems] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars');
      if (!response.ok) {
        throw new Error('Error al cargar los vehículos');
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-12">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <p>No hay vehículos disponibles</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 relative">
        <h2 className="mb-8 text-center text-3xl font-bold">Catálogo Destacado</h2>

        <Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          
          className="w-full group"
        >
          <div className="relative">
            <CarouselContent className="-ml-4">
              {items.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4 pl-4">
                  <Card className="h-full">
                    <CardContent className="flex flex-col p-6 h-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mb-3 h-40 w-full rounded object-cover"
                      />
                      <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-700 mb-2 flex-grow">{item.description}</p>
                      <p className="text-lg font-bold text-indigo-600 mb-2">
                        USD {item.price.toLocaleString()}
                      </p>
                      <span className="text-sm text-gray-500 mb-2">
                        {item.model} {item.year} | {item.km} Km
                      </span>
                      <div className="mt-auto">
                        <span className="mb-2 inline-block rounded bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                          {item.tag}
                        </span>
                        <a
                          href={`/catalogo/${item.id}`}
                          className="inline-block w-full rounded bg-indigo-600 py-2 text-center text-white hover:bg-indigo-700"
                        >
                          Ver detalle
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Flechas de navegación por fuera */}
            <CarouselPrevious 
              className="absolute -left-12 top-1/2 -translate-y-1/2 
                         bg-white shadow-md rounded-full w-10 h-10 
                         hidden lg:flex items-center justify-center 
                          group-hover:opacity-100 transition-all duration-300"
            />
            <CarouselNext 
              className="absolute -right-12 top-1/2 -translate-y-1/2 
                         bg-white shadow-md rounded-full w-10 h-10 
                         hidden lg:flex items-center justify-center 
                         group-hover:opacity-100 transition-all duration-300"
            />
          </div>

          {/* Dots personalizados */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? 'bg-indigo-600 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </Carousel>

        <div className="mt-8 flex justify-center">
          <a
            href="/catalogo"
            className="rounded bg-indigo-600 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-700"
          >
            Ver más vehículos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CarouselGrid;