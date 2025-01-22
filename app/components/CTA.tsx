import React from 'react';

const CTA: React.FC = () => (
  <section className="py-16 bg-indigo-600 text-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        ¿Listo para estrenar tu próximo auto?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
        Tenemos los mejores planes de financiamiento y los modelos 
        perfectos para tu estilo de vida. ¡Aprovecha nuestras ofertas!
      </p>
      <div className="mt-8">
        <a
          href="#contact"
          className="inline-block rounded bg-white px-6 py-3 text-lg font-medium text-indigo-600 hover:bg-gray-100"
        >
          Contáctanos hoy
        </a>
      </div>
    </div>
  </section>
);

export default CTA;
