"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

export interface CarItem {
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

interface FilterState {
  priceRange: { min: number; max: number };
  kmRange: { min: number; max: number };
  categories: string[];
  models: string[];
  years: number[];
}

const itemsPerPage = 9;

const CatalogPage: React.FC = () => {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 100000 },
    kmRange: { min: 0, max: 200000 },
    categories: [],
    models: [],
    years: []
  });

  // Cargar datos
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Error al cargar los vehículos');
        }
        const data = await response.json();
        setCars(data);
        
        // Actualizar rangos de filtros basados en datos reales
        const maxPrice = Math.max(...data.map((car: CarItem) => car.price));
        const maxKm = Math.max(...data.map((car: CarItem) => car.km));
        
        setFilters(prev => ({
          ...prev,
          priceRange: { min: 0, max: maxPrice },
          kmRange: { min: 0, max: maxKm }
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = 
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = 
        car.price >= filters.priceRange.min && 
        car.price <= filters.priceRange.max;

      const matchesKm = 
        car.km >= filters.kmRange.min && 
        car.km <= filters.kmRange.max;
      
      const matchesCategory = 
        filters.categories.length === 0 || 
        filters.categories.includes(car.category);
      
      const matchesModel = 
        filters.models.length === 0 || 
        filters.models.includes(car.model);
      
      const matchesYear = 
        filters.years.length === 0 || 
        filters.years.includes(car.year);

      return matchesSearch && matchesPrice && matchesCategory && 
             matchesModel && matchesYear && matchesKm;
    });
  }, [searchQuery, filters, cars]);

  const filterOptions = useMemo(() => {
    return {
      categories: Array.from(new Set(cars.map(car => car.category))),
      models: Array.from(new Set(cars.map(car => car.model))),
      years: Array.from(new Set(cars.map(car => car.year))).sort((a, b) => b - a),
      maxPrice: Math.max(...cars.map(car => car.price)),
      minPrice: Math.min(...cars.map(car => car.price)),
      maxKm: Math.max(...cars.map(car => car.km)),
      minKm: Math.min(...cars.map(car => car.km))
    };
  }, [cars]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCars = filteredCars.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
    setCurrentPage(1);
  };

  const handleKmChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({
      ...prev,
      kmRange: {
        ...prev.kmRange,
        [type]: value
      }
    }));
    setCurrentPage(1);
  };

  const handleFilterChange = (type: keyof FilterState, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [type]: Array.isArray(prev[type])
        ? ((prev[type] as Array<string | number>).includes(value)
          ? (prev[type] as Array<string | number>).filter(item => item !== value)  
          : [...(prev[type] as Array<string | number>), value])
        : prev[type]
    }));
    setCurrentPage(1);
   };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }


  return (
    <>
      <section className="relative w-full h-[300px] bg-gray-200 overflow-hidden">
        <img
          src="/photo-1441148345475-03a2e82f9719.jpeg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Nuestro Catálogo
          </h2>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          {/* Barra de búsqueda */}
          <div className="mb-8 flex justify-center w-full">
          <div className="relative w-full max-w-md md:max-w-full">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 
                        focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                        transition-all duration-300 ease-in-out 
                        text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filtros laterales */}
            <aside className={`md:w-64 bg-white p-6 rounded-lg shadow-lg ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
              <div className="space-y-6">
                {/* Rango de precios */}
                <div>
                  <h3 className="font-bold mb-3">Rango de Precios</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={filterOptions.minPrice}
                      max={filterOptions.maxPrice}
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${filters.priceRange.min.toLocaleString()}</span>
                      <span>${filters.priceRange.max.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Kilometraje */}
                <div>
                  <h3 className="font-bold mb-3">Kilometraje</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={filterOptions.minKm}
                      max={filterOptions.maxKm}
                      value={filters.kmRange.min}
                      onChange={(e) => handleKmChange('min', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{filters.kmRange.min.toLocaleString()} Km</span>
                      <span>{filters.kmRange.max.toLocaleString()} Km</span>
                    </div>
                  </div>
                </div>

                {/* Categorías */}
                <div>
                  <h3 className="font-bold mb-3">Categorías</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={() => handleFilterChange('categories', category)}
                          className="mr-2"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Modelos */}
                <div>
                  <h3 className="font-bold mb-3">Modelos</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.models.map(model => (
                      <label key={model} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.models.includes(model)}
                          onChange={() => handleFilterChange('models', model)}
                          className="mr-2"
                        />
                        {model}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Años */}
                <div>
                  <h3 className="font-bold mb-3">Año</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterOptions.years.map(year => (
                      <label key={year} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.years.includes(year)}
                          onChange={() => handleFilterChange('years', year)}
                          className="mr-2"
                        />
                        {year}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Grid de coches */}
            <div className="flex-1">
              {visibleCars.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No se encontraron vehículos con los filtros seleccionados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleCars.map(car => (
                    <div key={car.id} className="flex flex-col bg-white rounded-lg shadow-lg p-6">
                      <img 
                        src={car.image} 
                        alt={car.title} 
                        className="mb-4 h-40 w-full object-cover rounded" 
                      />
                      <h3 className="text-lg font-bold mb-2">{car.title}</h3>
                      <p className="text-gray-700 mb-2">{car.description}</p>
                      <p className="text-lg font-bold text-indigo-600 mb-2">
                        ${car.price.toLocaleString()}
                      </p>
                      <span className="text-sm text-gray-500 mb-2">
                        {car.model} {car.year} | {car.km} Km
                      </span>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-block bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded">
                          {car.tag}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
                          {car.category}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded">
                          {car.year}
                        </span>
                      </div>
                      <Link 
                        href={`/catalogo/${car.id}`} 
                        className="mt-auto bg-indigo-600 text-white text-center py-2 px-4 rounded hover:bg-indigo-700"
                      >
                        Ver detalle
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              {/* Paginación */}
              {visibleCars.length > 0 && (
                <div className="mt-8 flex justify-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`px-4 py-2 rounded ${
                        page === currentPage ? "bg-indigo-600 text-white" : "bg-gray-200"
                      } hover:bg-indigo-600 hover:text-white`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogPage;