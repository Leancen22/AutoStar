"use client";

import React, { useEffect, useState } from 'react';

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

  const visibleCards = 4;

  useEffect(() => {
    fetchCars();
  }, []);

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

  useEffect(() => {
    if (!items.length) return;

    const container = document.getElementById("carouselContainer");
    const track = document.getElementById("cardsTrack");
    const prevBtn = container?.querySelector(".prev") as HTMLElement;
    const nextBtn = container?.querySelector(".next") as HTMLElement;
    const dotsContainer = document.getElementById("carouselDots");
    const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot") : [];

    if (!container || !track) return;

    const totalCards = items.length;
    const stepPercent = 100 / visibleCards;
    const maxIndex = Math.max(0, totalCards - visibleCards);

    let currentIndex = 0;
    let startX = 0;
    let deltaX = 0;

    function updateTrack() {
      if(!track) return;
      const offset = currentIndex * stepPercent;
      track.style.transform = `translateX(-${offset}%)`;
      updateDots();
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-indigo-600", i === currentIndex);
        dot.classList.toggle("bg-gray-300", i !== currentIndex);
      });
    }

    function nextSlide() {
      currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
      updateTrack();
    }

    function prevSlide() {
      currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
      updateTrack();
    }

    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchmove", (e) => {
      deltaX = e.touches[0].clientX - startX;
    });

    track.addEventListener("touchend", () => {
      if (deltaX > 50) prevSlide();
      if (deltaX < -50) nextSlide();
      deltaX = 0;
    });

    prevBtn?.addEventListener("click", prevSlide);
    nextBtn?.addEventListener("click", nextSlide);

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const dotIndex = (dot as HTMLElement).getAttribute('data-dot');
        currentIndex = parseInt(dotIndex || "0", 10);
        updateTrack();
      });
    });

    updateTrack();

    // Cleanup
    return () => {
      prevBtn?.removeEventListener("click", prevSlide);
      nextBtn?.removeEventListener("click", nextSlide);
    };
  }, [items]);

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
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Catálogo Destacado</h2>

        <div
          id="carouselContainer"
          className="relative overflow-hidden rounded-md"
          data-total-cards={items.length}
          data-visible-cards={visibleCards}
        >
          <div
            id="cardsTrack"
            className="flex transition-transform duration-500 ease-out"
            style={{ touchAction: "pan-y" }}
          >
            {items.map((item) => (
              <div key={item.id} className="w-full sm:w-1/2 lg:w-1/4 flex-none p-4">
                <div className="flex flex-col rounded-lg shadow-lg bg-white p-6 h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mb-3 h-40 w-full rounded object-cover"
                  />
                  <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-700 mb-2">{item.description}</p>
                  <p className="text-lg font-bold text-indigo-600 mb-2">
                    ${item.price.toLocaleString()}
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
                </div>
              </div>
            ))}
          </div>

          <button className="prev absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-700 shadow hover:bg-gray-100">
            ‹
          </button>
          <button className="next absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 text-gray-700 shadow hover:bg-gray-100">
            ›
          </button>
        </div>

        <div id="carouselDots" className="mt-4 flex justify-center space-x-2">
          {Array.from(
            { length: Math.max(0, items.length - visibleCards + 1) },
            (_, i) => (
              <button
                key={i}
                className="dot h-3 w-3 rounded-full bg-gray-300"
                data-dot={i}
              ></button>
            )
          )}
        </div>

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