export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vehículo no encontrado</h2>
          <p className="text-gray-600 mb-4">
            Lo sentimos, el vehículo que estás buscando no está disponible o ha sido removido.
          </p>
          <a
            href="/catalogo"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
          >
            Volver al catálogo
          </a>
        </div>
      </div>
    );
  }