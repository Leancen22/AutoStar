// pages/nosotros.tsx
import React from 'react';

const Nosotros: React.FC = () => {
  return (
    <>
      {/* Banner */}
      <section className="relative w-full h-[300px] bg-gray-200 overflow-hidden">
        <img
          src="/images.png"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Nosotros
          </h2>
        </div>
      </section>

      {/* Texto introductorio */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            En AutoStar, somos una empresa apasionada por los automóviles y la satisfacción de nuestros clientes.
            Con años de experiencia en el sector, nuestro equipo se dedica a ofrecer los mejores vehículos,
            asesoría y servicio para hacer de la compra de tu auto una experiencia única y confiable.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 space-y-16">
            <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 md:pr-8">
                        <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
                        <p className="text-gray-700">
                            className en 2000, AutoStar comenzó como un pequeño concesionario local y ha crecido hasta convertirse
                            en una referencia nacional. Nuestra dedicación a la calidad y al servicio al cliente nos distingue.
                        </p>
                    </div>
                    <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
                        <img src="/images.png" alt="Nuestra Historia" className="w-full rounded-lg shadow-md" />
                    </div>
                </div>
           </div>
        </section>
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4 space-y-16">
                <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-2/3 md:pl-8">
                    <h2 className="text-2xl font-bold mb-4">Nuestro Equipo</h2>
                    <p className="text-gray-700">
                        Contamos con un equipo de expertos apasionados por los vehículos, dedicados a ayudarte a encontrar
                        el auto perfecto y brindarte un servicio excepcional en cada paso del proceso.
                    </p>
                    </div>
                <div className="md:w-1/3 md:pr-8 mt-8 md:mt-0">
                <img src="/images.png" alt="Nuestro Equipo" className="w-full rounded-lg shadow-md" />
            </div>
        </div>
        </div>
        </section>
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-gray-700">
                Nuestra misión es proveer vehículos de calidad y un servicio personalizado que supere tus expectativas.
                Nos esforzamos por ser líderes en el sector, impulsando la innovación y la satisfacción total de nuestros clientes.
            </p>
            </div>
            <div className="md:w-1/3 md:pl-8 mt-8 md:mt-0">
            <img src="/images.png" alt="Nuestra Misión" className="w-full rounded-lg shadow-md" />
            </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Nosotros;
