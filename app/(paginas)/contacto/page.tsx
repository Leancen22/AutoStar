// pages/contacto.tsx
"use client";

import React from 'react';

const contactInfo = {
  phone: "+1 234 567 890",
  email: "contacto@autostar.com",
  instagram: "@autostar",
  address: "123 Calle Principal, Ciudad"
};

const Contacto: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Aquí puedes agregar lógica para enviar el formulario, por ejemplo, a una API.
      console.log('Datos del formulario:', data);
      alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
      form.reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
  };

  return (
      <>
        <section className="relative w-full h-[300px] bg-gray-200 overflow-hidden bg-black/50">
        <img
          src="/Imagen-contacto.jpg"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex h-full items-center justify-center text-center px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Contáctenos
          </h2>
        </div>
      </section>

    
      <section className="bg-white py-16">
  <div className="container mx-auto px-4">
    <h2 className="mb-12 text-center text-3xl font-bold">¿Por donde puedes contactarnos?</h2>
    
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="rounded bg-white p-6 shadow transition-shadow hover:shadow-lg">
        <div className="mb-4">
          <h3 className="flex items-center text-xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] mr-2" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg>
            Teléfono
          </h3>
        </div>
        <p className="text-gray-600">+598 99999999</p>
      </div>

      <div className="rounded bg-white p-6 shadow transition-shadow hover:shadow-lg">
        <div className="mb-4">
          <h3 className="flex items-center text-xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] mr-2" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
            Correo electrónico
          </h3>
        </div>
        <p className="text-gray-600">correo@correo.com</p>
      </div>

      <div className="rounded bg-white p-6 shadow transition-shadow hover:shadow-lg">
        <div className="mb-4">
          <h3 className="flex items-center text-xl font-bold">
            <svg role="img" className="w-[22px] mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>
            Instagram
          </h3>
        </div>
        <p className="text-gray-600">@instagram_account</p>
      </div>
    </div>
  </div>
</section>


      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          {/* Título y descripción */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold">¡Contáctanos!</h2>
            <p className="mx-auto mt-2 max-w-2xl text-gray-600">
              ¿Tienes dudas o quieres agendar una visita? Completa el formulario y te responderemos a la brevedad.
            </p>
          </div>

          {/* Grid de mapa y formulario */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Mapa */}
            <div className="aspect-w-16 aspect-h-9 relative md:aspect-h-auto md:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.757463417256!2d-122.08224798469062!3d37.38605177983442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb6a3e7f5bdc9%3A0xc2c7593402d08056!2sGoogleplex!5e0!3m2!1sen!2sus!4v1693239175554!5m2!1sen!2sus"
                className="absolute inset-0 h-full w-full rounded"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Formulario */}
            <form className="w-full max-w-md" id="contactForm" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tu correo"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Tu número de contacto"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Cuéntanos qué tipo de auto buscas o en qué podemos ayudarte"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
      
      </>
  );
};

export default Contacto;
