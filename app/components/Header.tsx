"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';

const Header: React.FC = () => {
  useEffect(() => {
    function setupMobileMenu() {
      const mobileMenuButton = document.getElementById("mobileMenuButton");
      console.log("test");
      if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", () => {
          const mobileMenu = document.getElementById("mobileMenu");
          if (mobileMenu) {
            mobileMenu.classList.toggle("hidden");
          }
        });
      }
    }

    // Ejecutar la configuración del menú móvil al montar el componente
    setupMobileMenu();
    
    // (Opcional) Si deseas reconfigurar en cada navegación SPA, agrega un listener para 'astro:page-load' aquí.
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-indigo-600">AutoStar</a>

        {/* Botón Hamburguesa (Mobile) */}
        <button
          id="mobileMenuButton"
          className="block md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Menú de Navegación para Desktop */}
        <ul id="menu" className="hidden md:flex space-x-6 items-center">
          <li>
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">Inicio</Link>
          </li>
          <li>
            <Link href="/catalogo" className="text-gray-700 hover:text-indigo-600 font-medium">Catálogo</Link>
          </li>
          <li>
            <Link href="/nosotros" className="text-gray-700 hover:text-indigo-600 font-medium">Nosotros</Link>
          </li>
          <li>
            <Link href="/contacto" className="text-gray-700 hover:text-indigo-600 font-medium">Contacto</Link>
          </li>
          <li>
            <Link
              href="#cotizar"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700"
            >
              Cotiza Ahora
            </Link>
          </li>
        </ul>
      </div>

      {/* Menú Mobile */}
      <ul
        id="mobileMenu"
        className="hidden flex-col space-y-4 bg-white px-4 py-6 shadow-md md:hidden"
      >
        <li>
          <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium">Inicio</Link>
        </li>
        <li>
          <Link href="/catalogo" className="text-gray-700 hover:text-indigo-600 font-medium">Catálogo</Link>
        </li>
        <li>
          <Link href="/nosotros" className="text-gray-700 hover:text-indigo-600 font-medium">Nosotros</Link>
        </li>
        <li>
          <Link href="/contacto" className="text-gray-700 hover:text-indigo-600 font-medium">Contacto</Link>
        </li>
        <li>
          <Link
            href="#cotizar"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700"
          >
            Cotiza Ahora
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
