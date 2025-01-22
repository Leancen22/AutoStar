"use client";
import React, { useEffect, useRef, useState } from 'react';

const logos: string[] = [
  "/1000.webp",
  "/1001.webp",
  "/1002.webp",
  "/Ford_Motor_Company_Logo.svg",
  "/Honda_wordmark.svg",
  "/Nissan2020.svg",
  "/Toyota_Europe_2020.svg",
  "/logo.png",
];

const Brands: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let animationId: number;
    let position = 0;
    const logoWidth = 250 + 128; // logo width + gap
    const totalWidth = logoWidth * logos.length * 2;

    const animate = () => {
      position -= 1;
      if (Math.abs(position) >= totalWidth / 2) {
        position = 0;
      }
      track.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-12 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Nuestras Marcas
        </h2>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden h-[200px]"
      >
        <div 
          ref={trackRef}
          className="flex gap-32 whitespace-nowrap transition-transform duration-0 ease-linear"
        >
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <img 
              key={`logo-${idx}`}
              src={logo}
              alt="Marca"
              className="w-[250px] max-h-[150px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;