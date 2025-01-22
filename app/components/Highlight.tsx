import React from 'react';

interface HighlightProps {
  imageUrl?: string;
  title?: string;
  height?: string;  // Por ejemplo, "h-[500px]"
}

const Highlight: React.FC<HighlightProps> = ({
  imageUrl = "/6a08a2d39cd6fc563d8af395e4135be8.jpg",
  title = "Explora nuestra colección",
  height = "h-[300px]"
}) => {
  return (
    <section className={`relative w-full ${height} bg-gray-200 overflow-hidden`}>
      {/* Imagen de fondo */}
      <img
        src={imageUrl}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay de contenido */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default Highlight;
