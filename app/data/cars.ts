export interface CarItem {
    id: number;
    title: string;
    image: string;
    description: string;
    tag: string;
    price: number;
    category: string;
    model: string;
    year: number;
    km: number;

    features?: string[];
    specifications?: Record<string, string>;
    gallery?: string[];
    financingOptions?: { plan: string; details: string }[];
  }
  
  export const cars: CarItem[] = [
    {
      id: 1,
      image: "https://www.alpinarentacar.com.uy/images/2023/gol23-sedan.png",
      title: "Sedán Económico",
      description: "Ideal para ciudad.",
      tag: "Usado",
      price: 15000,
      category: "Sedán",
      model: "Toyota Corola",
      year: 2020,
      km: 11000,
      features: ["Motor 1.6L", "Aire acondicionado", "Sistema de frenado ABS"],
      specifications: {
        Potencia: "120 HP",
        Transmisión: "Manual",
        Combustible: "Gasolina",
        "Consumo promedio": "15 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Básico", details: "Cuota inicial del 30%, hasta 24 meses." },
        { plan: "Plan Premium", details: "Cuota inicial del 10%, hasta 60 meses." },
      ],
    },
    {
      id: 2,
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/34457/cr-v-exterior-right-front-three-quarter.jpeg?q=80",
      title: "SUV Familiar",
      description: "Espacio y comodidad",
      tag: "Nuevo",
      price: 25000,
      category: "SUV",
      model: "Toyota RAV4",
      year: 2021,
      km: 28000,
      features: ["Motor 2.0L", "Espacio para 7 pasajeros", "Tracción integral"],
      specifications: {
        Potencia: "180 HP",
        Transmisión: "Automática",
        Combustible: "Diesel",
        "Consumo promedio": "12 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Familiar", details: "Cuota inicial del 25%, hasta 48 meses." },
        { plan: "Plan Premium", details: "Cuota inicial del 15%, hasta 60 meses." },
      ],
    },
    {
      id: 3,
      image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/34457/cr-v-exterior-right-front-three-quarter.jpeg?q=80",
      title: "Deportivo Elegante",
      description: "Velocidad y estilo",
      tag: "Oferta",
      price: 35000,
      category: "Deportivo",
      model: "Toyota Supra",
      year: 2022,
      km: 55000,
      features: ["Motor V6", "Asientos deportivos", "Aerodinámica optimizada"],
      specifications: {
        Potencia: "350 HP",
        Transmisión: "Automática",
        Combustible: "Gasolina",
        "Consumo promedio": "8 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Deportivo", details: "Cuota inicial del 40%, hasta 36 meses." },
        { plan: "Plan Elite", details: "Cuota inicial del 20%, hasta 48 meses." },
      ],
    },
    {
      id: 4,
      image: "https://llavesycontroles.com/wp-content/uploads/2024/06/Articulo-Toyota-Hilux-www.llavesycontroles.com_-1.jpg",
      title: "Camioneta 4x4",
      description: "Potencia y versatilidad",
      tag: "Destacado",
      price: 45000,
      category: "Camioneta",
      model: "Toyota Hilux",
      year: 2023,
      km: 70000,
      features: ["Tracción 4x4", "Alta capacidad de carga", "Sistema de navegación"],
      specifications: {
        Potencia: "250 HP",
        Transmisión: "Automática",
        Combustible: "Diesel",
        "Consumo promedio": "10 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Todo Terreno", details: "Cuota inicial del 35%, hasta 48 meses." },
        { plan: "Plan Full", details: "Cuota inicial del 20%, hasta 60 meses." },
      ],
    },
    {
      id: 5,
      image: "https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXkBuNYdMGF4tl3U0%25z8rMH1spbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmHlCgI7Zl2dioCLafQDcFG8oXYnfurn2k5yPewFo0CvNzxUGqA7fQIs5OJUPYwgzTB8VuyY0oVk0DBRl2vzpQNqjdtAsvyJ5I",
      title: "Coupé Premium",
      description: "Diseño sofisticado",
      tag: "Nuevo",
      price: 55000,
      category: "Coupé",
      model: "Toyota GT86",
      year: 2024,
      km: 95000,
      features: ["Diseño aerodinámico", "Tecnología avanzada", "Luces LED"],
      specifications: {
        Potencia: "300 HP",
        Transmisión: "Automática",
        Combustible: "Gasolina",
        "Consumo promedio": "9 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Coupé", details: "Cuota inicial del 30%, hasta 48 meses." },
        { plan: "Plan Premium Coupé", details: "Cuota inicial del 20%, hasta 60 meses." },
      ],
    },
    {
      id: 6,
      image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKL4UBD771XdRgpbgJsrCiFmz4w3Uqq1i3LNRC7un2P-CdD7ZSFOlqicqbJHw691GjWlo_nkUkijlaGf8jup9VawOcrga50NMEZkc-uOVJqCC1TJwtzFpnkrEllGcnvxYiVaybkNppCwQ/w1200-h630-p-k-no-nu/Lanzamiento-Mercedes-Benz-Sprinter-III-Autoblog-Uruguay00001.jpeg",
      title: "Furgón Comercial",
      description: "Carga y equipamiento",
      tag: "Usado",
      price: 65000,
      category: "Furgón",
      model: "Toyota Hiace",
      year: 2025,
      km: 100000,
      features: ["Amplio maletero", "Eficiencia en consumo", "Durabilidad"],
      specifications: {
        Potencia: "150 HP",
        Transmisión: "Manual",
        Combustible: "Diesel",
        "Consumo promedio": "12 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Comercial", details: "Cuota inicial del 25%, hasta 36 meses." },
        { plan: "Plan Económico", details: "Cuota inicial del 20%, hasta 48 meses." },
      ],
    },
    {
      id: 7,
      image: "https://cloudfront-us-east-1.images.arcpublishing.com/tgam/IVOAVVEQR5DX3L4BG7UR26NRA4",
      title: "Hatchback Urbano",
      description: "Compacto y eficiente",
      tag: "Oferta",
      price: 75000,
      category: "Hatchback",
      model: "Toyota Yaris",
      year: 2026,
      km: 190000,
      features: ["Motor eficiente", "Maniobrabilidad", "Bajo consumo"],
      specifications: {
        Potencia: "100 HP",
        Transmisión: "Manual",
        Combustible: "Gasolina",
        "Consumo promedio": "18 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Urbano", details: "Cuota inicial del 15%, hasta 36 meses." },
        { plan: "Plan Oferta", details: "Cuota inicial del 10%, hasta 24 meses." },
      ],
    },
    {
      id: 8,
      image: "https://cdn-datak.motork.net/configurator-imgs/trucks/es/800/FORD/RANGER-RAPTOR/8499_PICKUP-DOBLE-CABINA-4-PUERTAS/ford-ranger-raptor-22-front-view.jpg",
      title: "Pick-up Dual",
      description: "Trabajo y familia",
      tag: "Destacado",
      price: 85000,
      category: "Pick-up",
      model: "Toyota Tacoma",
      year: 2027,
      km: 110000,
      features: ["Altura libre", "Capacidad todoterreno", "Espacio interior"],
      specifications: {
        Potencia: "220 HP",
        Transmisión: "Automática",
        Combustible: "Gasolina",
        "Consumo promedio": "11 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Dual", details: "Cuota inicial del 30%, hasta 60 meses." },
        { plan: "Plan Avanzado", details: "Cuota inicial del 20%, hasta 72 meses." },
      ],
    },
    {
      id: 9,
      image: "https://issimi-vehicles-cdn.b-cdn.net/publicamlvehiclemanagement/VehicleDetails/628/timestamped-1722570747278-2018%20McLaren%20720S_001.jpg?width=3840&quality=75",
      title: "Coupe Deportivo",
      description: "Rápido en pista",
      tag: "Nuevo",
      price: 95000,
      category: "Coupé",
      model: "Toyota GR86",
      year: 2028,
      km: 200000,
      features: ["Motor turbo", "Asientos deportivos", "Tecnología avanzada"],
      specifications: {
        Potencia: "400 HP",
        Transmisión: "Automática",
        Combustible: "Gasolina",
        "Consumo promedio": "7 km/L",
      },
      gallery: ["/images.png", "/images.png", "/images.png"],
      financingOptions: [
        { plan: "Plan Deportivo", details: "Cuota inicial del 40%, hasta 36 meses." },
        { plan: "Plan Elite Deportivo", details: "Cuota inicial del 30%, hasta 48 meses." },
      ],
    },
  ];