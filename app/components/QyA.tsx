import React from 'react';

const QyA: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Preguntas Frecuentes</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
          Encuentra respuestas a las dudas más comunes antes de comprar tu próximo auto.
        </p>
        
        <div className="mx-auto max-w-3xl space-y-4">
          {/* FAQ Item 1 */}
          <details className="group rounded-lg bg-white shadow p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800 outline-none focus:outline-none group-open:text-indigo-600">
              ¿Ofrecen financiamiento para la compra de vehículos?
            </summary>
            <div className="mt-2 text-gray-700">
              Sí, contamos con múltiples planes de financiamiento adaptados a tus necesidades. 
              Puedes consultar nuestra sección de financiamiento o comunicarte con un asesor 
              para obtener más detalles.
            </div>
          </details>
    
          {/* FAQ Item 2 */}
          <details className="group rounded-lg bg-white shadow p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800 outline-none focus:outline-none group-open:text-indigo-600">
              ¿Los vehículos usados cuentan con alguna garantía?
            </summary>
            <div className="mt-2 text-gray-700">
              Todos nuestros vehículos usados pasan por una rigurosa revisión antes de ser publicados. 
              Dependiendo del modelo y antigüedad, ofrecemos garantías especiales para asegurar tu tranquilidad.
            </div>
          </details>
    
          {/* FAQ Item 3 */}
          <details className="group rounded-lg bg-white shadow p-4">
            <summary className="cursor-pointer text-lg font-semibold text-gray-800 outline-none focus:outline-none group-open:text-indigo-600">
              ¿Cómo puedo reservar un Test Drive?
            </summary>
            <div className="mt-2 text-gray-700">
              Puedes agendar tu prueba de manejo a través de nuestro formulario de contacto o llamando 
              directamente a nuestras líneas de atención. Uno de nuestros asesores coordinará contigo la fecha y hora.
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default QyA;
