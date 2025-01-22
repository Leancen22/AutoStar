"use client";
import React, { useEffect, useRef, useState } from 'react';

interface HeroSlide {
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonLink: string;
}

const slides: HeroSlide[] = [
  {
    image: "/A202506_web_2880.jpg",
    title: "Encuentra el auto perfecto para ti",
    description: "En AutoStar combinamos variedad y asesoría para que estrenes tu próximo vehículo sin preocupaciones.",
    buttonLabel: "Cotiza ahora",
    buttonLink: "#contact",
  },
  {
    image: "/1920-x-1080-car-4sdj5tojfx747aly.jpg",
    title: "Servicio de calidad garantizada",
    description: "Rigurosas inspecciones para asegurar el mejor desempeño en tu día a día.",
    buttonLabel: "Conoce más",
    buttonLink: "#features",
  },
  {
    image: "/photo-1568605117036-5fe5e7bab0b7.jpeg",
    title: "Atención personalizada 24/7",
    description: "Estamos disponibles para resolver tus dudas y asesorarte en todo momento.",
    buttonLabel: "Contacto",
    buttonLink: "#contact",
  },
];

const intervalTime = 10000; // 10 segundos

const HeroSlider: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.querySelectorAll('div.flex-none');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function showSlide(index: number) {
      if (track) {
        track.style.transform = `translateX(-${100 * index}%)`;
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }

    showSlide(currentIndex);
    const auto = setInterval(nextSlide, intervalTime);

    const handleScroll = () => {
      console.log('Scroll position:', window.scrollY);
      
      // Establecer un límite de scroll donde quieres que desaparezca la flecha
      const scrollThreshold = 100; // Ajusta este valor según necesites
      
      setShowScrollArrow(window.scrollY < scrollThreshold);
    };

    // Añadir el event listener
    window.addEventListener('scroll', handleScroll);

    // Limpiar en el desmontaje
    return () => {
      clearInterval(auto);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      className="relative overflow-hidden w-full min-h-[calc(100vh-64px)]" 
      id="heroSlider"
    >
      <div 
        id="slidesTrack"
        ref={trackRef}
        className="flex transition-transform duration-700 h-full w-full"
      >
        {slides.map((slide, index) => (
          <div key={index} className="flex-none w-full h-full min-h-[calc(100vh-64px)] relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            <div className='absolute inset-0 bg-black/50 p-4'>
              <div className="text-white relative z-10 flex h-full min-h-screen flex-col items-center justify-center text-center px-8 bg-white/70 md:bg-transparent md:items-start md:text-left md:max-w-[66%] md:p-12 md:pl-[190px]">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-white max-w-md mb-6 text-gray-700">
                  {slide.description}
                </p>
                <a
                  href={slide.buttonLink}
                  className="inline-block rounded bg-indigo-600 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-700"
                >
                  {slide.buttonLabel}
                </a>
              </div>
            </div>  
          </div>
        ))}
      </div>




      {showScrollArrow ? (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 
                    transition-all duration-500 ease-in-out 
                    opacity-100 translate-y-0 
                    animate-fade-in-down"
        >
          <a 
                  href="#features" 
                  className="animate-bounce inline-block"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-white bg-transparent border border-white/30 rounded-full p-2"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </a>
        </div>
      ) : (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 
                    transition-all duration-500 ease-in-out 
                    opacity-0 translate-y-full"
        >
        <a 
                  href="#features" 
                  className="animate-bounce inline-block"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-white bg-transparent border border-white/30 rounded-full p-2"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </a>
        </div>
      )}
    </section>
  );
};

export default HeroSlider;