import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
  
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded shadow p-6">
            <div className="mb-4">
              <h3 className="flex items-center text-xl font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4.5 8-10V5l-8-3-8 3v7c0 5.5 8 10 8 10z" />
                  <path d="M9 10l2 2 4-4" />
                </svg>
                Calidad Garantizada
              </h3>
            </div>
            <div>
              <p>
                Todos nuestros vehículos pasan por rigurosas inspecciones para asegurar su calidad y rendimiento.
              </p>
            </div>
          </div>
  
          {/* Card 2 */}
          <div className="bg-white rounded shadow p-6">
            <div className="mb-4">
              <h3 className="flex items-center text-xl font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Entrega a Domicilio
              </h3>
            </div>
            <div>
              <p>
                Ofrecemos entrega a domicilio en todo el país para que puedas recibir tu nuevo vehículo sin complicaciones.
              </p>
            </div>
          </div>
  
          {/* Card 3 */}
          <div className="bg-white rounded shadow p-6">
            <div className="mb-4">
              <h3 className="flex items-center text-xl font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0118 0v6" />
                  <path d="M21 19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2z" />
                  <path d="M3 19a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Atención al Cliente 24/7
              </h3>
            </div>
            <div>
              <p>
                Nuestro equipo de atención al cliente está disponible las 24 horas para resolver todas tus dudas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
