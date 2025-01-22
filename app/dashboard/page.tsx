"use client";

import { useState, useEffect } from "react";
import { X, Plus, Save, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    image: null,
    description: "",
    tag: "",
    price: "",
    category: "",
    model: "",
    year: "",
    km: "",
    features: [""],
    specifications: {
      motor: "",
      transmision: "",
      combustible: "",
      traccion: "",
      color: "",
    },
    gallery: [],
    financingOptions: [
      {
        name: "",
        initialPayment: "",
        monthlyPayment: "",
        term: "",
      },
    ],
  });

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => {
          setCars(data)
          setLoading(false);
        }
      )
      .catch((error) => {
        console.error("Error fetching cars:", error)
        setLoading(true);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "El título es obligatorio";
    if (!formData.description.trim()) newErrors.description = "La descripción es obligatoria";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (!formData.year || parseInt(formData.year) < 1900 || parseInt(formData.year) > new Date().getFullYear()) {
      newErrors.year = "Año inválido";
    }
    if (!formData.km || parseInt(formData.km) < 0) newErrors.km = "Kilometraje inválido";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures,
    });
  };

  const handleAddFinancingOption = () => {
    setFormData({
      ...formData,
      financingOptions: [
        ...formData.financingOptions,
        {
          name: "",
          initialPayment: "",
          monthlyPayment: "",
          term: "",
        },
      ],
    });
  };

  const handleRemoveFinancingOption = (index) => {
    const newOptions = formData.financingOptions.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      financingOptions: newOptions,
    });
  };

  const handleFinancingOptionChange = (index, key, value) => {
    const newOptions = [...formData.financingOptions];
    newOptions[index] = {
      ...newOptions[index],
      [key]: value,
    };
    setFormData({
      ...formData,
      financingOptions: newOptions,
    });
  };

  const handleGalleryChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleGalleryRemove = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
        const formDataToSend = new FormData();
        
        if (formData.id) {
          formDataToSend.append('id', formData.id);
        }
        // Log de los datos que vamos a enviar
        console.log('Datos del formulario antes de enviar:', {
          ...formData,
          image: formData.image ? 'File present' : 'No file',
          gallery: galleryFiles.length + ' files'
        });
        
        // Asegurarse de que los números son strings antes de enviarlos
        const dataToSend = {
          ...formData,
          price: formData.price?.toString() || '',
          year: formData.year?.toString() || '',
          km: formData.km?.toString() || '',
        };
      
        // Agregar cada campo al FormData
        Object.keys(dataToSend).forEach((key) => {
          if (key === "features" || key === "specifications" || key === "financingOptions") {
            const jsonValue = JSON.stringify(dataToSend[key]);
            console.log(`Añadiendo ${key}:`, jsonValue);
            formDataToSend.append(key, jsonValue);
          } else if (key === "image" && formData.image) {
            console.log('Añadiendo imagen');
            formDataToSend.append(key, formData.image);
          } else if (key !== "gallery" && dataToSend[key] !== null) {
            console.log(`Añadiendo ${key}:`, dataToSend[key]);
            formDataToSend.append(key, dataToSend[key]);
          }
        });
      
        // Agregar archivos de la galería
        galleryFiles.forEach((file, index) => {
          console.log(`Añadiendo archivo de galería ${index + 1}`);
          formDataToSend.append("gallery", file);
        });
      
        const endpoint = formData.id ? `/api/cars/update` : "/api/cars/create";
        const method = formData.id ? "PUT" : "POST";
      
        console.log('Enviando petición a:', endpoint, 'método:', method);
      
        try {
          // Primera petición - guardar el coche
          const response = await fetch(endpoint, {
            method,
            body: formDataToSend,
          });
      
          // Log de la respuesta completa
          console.log('Respuesta del servidor:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries([...response.headers]),
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            console.log('Texto del error:', errorText);
            
            let errorMessage;
            try {
              // Intentar parsear como JSON
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.error || errorJson.message || errorText;
            } catch {
              // Si no es JSON, usar el texto directamente
              errorMessage = errorText;
            }
            
            throw new Error(`Error del servidor (${response.status}): ${errorMessage}`);
          }
      
          const data = await response.json();
          console.log('Datos guardados exitosamente:', data);
      
          // Actualizar lista de coches
          const carsResponse = await fetch("/api/cars");
          const updatedCars = await carsResponse.json();
          setCars(updatedCars);
      
          // Resetear formulario
          setFormData({
            id: null,
            title: "",
            image: null,
            description: "",
            tag: "",
            price: "",
            category: "",
            model: "",
            year: "",
            km: "",
            features: [""],
            specifications: {
              motor: "",
              transmision: "",
              combustible: "",
              traccion: "",
              color: "",
            },
            gallery: [],
            financingOptions: [
              {
                name: "",
                initialPayment: "",
                monthlyPayment: "",
                term: "",
              },
            ],
          });
          setGalleryFiles([]);
          
          alert('Vehículo guardado exitosamente');
        } catch (fetchError) {
          console.error('Error en la petición fetch:', fetchError);
          throw fetchError; // Re-lanzar para el manejo en el catch exterior
        }
      } catch (error) {
        console.error('Error en handleSave:', error);
        alert(error.message || 'Error al guardar el vehículo');
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard de Administración</h1>
        
        <form onSubmit={handleSave} className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tag</label>
              <select
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Seleccionar Etiqueta</option>
                <option value="nuevo">Nuevo</option>
                <option value="usado">Usado</option>
                <option value="importado">Importado</option>
                <option value="oferta">Oferta</option>
                <option value="destacado">Destacado</option>
                <option value="vendido">Vendido</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Modelo</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Año</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.year ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Kilometraje</label>
              <input
                type="number"
                value={formData.km}
                onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.km ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.km && (
                <p className="text-red-500 text-sm">{errors.km}</p>
              )}
            </div>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Imagen Principal */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Imagen Principal</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Vista previa"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Galería */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Galería de Imágenes</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {galleryFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleGalleryRemove(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Características */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Características</label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </button>
            </div>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="Ej: Aire acondicionado"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="p-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Especificaciones */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Especificaciones</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Motor"
                value={formData.specifications.motor}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, motor: e.target.value },
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Transmisión"
                value={formData.specifications.transmision}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, transmision: e.target.value },
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Combustible"
                value={formData.specifications.combustible}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, combustible: e.target.value },
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Tracción"
                value={formData.specifications.traccion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, traccion: e.target.value },
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Color"
                value={formData.specifications.color}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, color: e.target.value },
                  })
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Opciones de Financiamiento */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Opciones de Financiamiento</label>
              <button
                type="button"
                onClick={handleAddFinancingOption}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Opción
              </button>
            </div>
            <div className="space-y-4">
              {formData.financingOptions.map((option, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">Opción {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveFinancingOption(index)}
                      className="p-1 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nombre del plan"
                      value={option.name}
                      onChange={(e) => handleFinancingOptionChange(index, "name", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Pago inicial"
                      value={option.initialPayment}
                      onChange={(e) => handleFinancingOptionChange(index, "initialPayment", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Pago mensual"
                      value={option.monthlyPayment}
                      onChange={(e) => handleFinancingOptionChange(index, "monthlyPayment", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Plazo (meses)"
                      value={option.term}
                      onChange={(e) => handleFinancingOptionChange(index, "term", e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón de guardar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Guardando..." : "Guardar Vehículo"}
          </button>
        </form>
      </div>
      
      {/* Lista de vehículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{car.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{car.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">${car.price.toLocaleString()}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setFormData({
                        ...car,
                        image: null,
                      });
                      window.scrollTo(0, 0);
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("¿Está seguro de eliminar este vehículo?")) {
                        await fetch(`/api/cars/${car.id}`, { method: "DELETE" });
                        setCars(cars.filter((c) => c.id !== car.id));
                      }
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}