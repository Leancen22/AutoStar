// pages/contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
      <section id="contact" className="py-16 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4">
          {/* Título y descripción centrados */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold">¡Contáctanos!</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">
              ¿Tienes dudas o quieres agendar una visita? Completa el formulario y te responderemos a la brevedad.
            </p>
          </div>

          {/* Contenedor de dos columnas (mapa + formulario) */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Columna Izquierda: Mapa */}
            <div className="aspect-w-16 aspect-h-9 md:aspect-h-auto md:h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.757463417256!2d-122.08224798469062!3d37.38605177983442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb6a3e7f5bdc9%3A0xc2c7593402d08056!2sGoogleplex!5e0!3m2!1sen!2sus!4v1693239175554!5m2!1sen!2sus"
                style={{ border: 0 }}
                className="absolute inset-0 w-full h-full rounded"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Columna Derecha: Formulario */}
            <form className="max-w-md w-full">
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Tu nombre"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Tu correo"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Tu número de contacto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-1 w-full rounded border border-gray-300 p-2"
                  placeholder="Cuéntanos qué tipo de auto buscas o en qué podemos ayudarte"
                ></textarea>
              </div>
              <button
                type="submit"
                className="mt-4 rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
  );
};

export default Contact;
