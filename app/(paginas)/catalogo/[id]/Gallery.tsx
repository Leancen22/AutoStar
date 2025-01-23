"use client"
import React, { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  type CarouselApi 
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Gallery({ 
  gallery, 
  youtubeURL, 
  financingOptions 
}: { 
  gallery: string[], 
  youtubeURL?: string[], 
  financingOptions?: any 
}) {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const getYouTubeThumbnail = (url: string): string => {
    const videoId = url.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleMediaClick = (media: string, video: boolean = false) => {
    setSelectedMedia(media);
    setIsVideo(video);
  };

  const handleClose = () => {
    setSelectedMedia(null);
    setIsVideo(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-12">
      <div className="relative w-full md:w-2/3">
      <Carousel 
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full group"
        >
          <CarouselContent>
            {gallery.map((image, index) => (
              <CarouselItem key={index} className="basis-full">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full rounded-lg object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious 
            className="absolute left-4 top-1/2 -translate-y-1/2 
                       bg-white shadow-md rounded-full w-10 h-10 
                       flex items-center justify-center"
          />
          <CarouselNext 
            className="absolute right-4 top-1/2 -translate-y-1/2 
                       bg-white shadow-md rounded-full w-10 h-10 
                       flex items-center justify-center"
          />

          {/* Dots personalizados */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index + 1
                    ? 'bg-indigo-600 w-6' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </Carousel>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
        {(youtubeURL ?? []).length > 0 && (
         <h2 className="text-2xl font-bold mb-6">Video relacionado</h2>
        )}
        
        {youtubeURL?.map((url, index) => (
          <div 
            key={`video-${index}`} 
            className="rounded-lg overflow-hidden shadow-lg h-64 relative group cursor-pointer mb-4" 
            onClick={() => handleMediaClick(url, true)}
          >
            <img
              src={getYouTubeThumbnail(url)}
              alt={`Video thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <svg 
                className="w-16 h-16 text-white"
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        ))}

        {financingOptions && Array.isArray(financingOptions) && financingOptions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Opciones de Financiamiento</h2>
            <div className="flex flex-col gap-4">
              {(financingOptions as Array<{plan: string; details: string}>).map((option, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{option.plan}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{option.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[80vw] h-[80vh] p-0">
          <DialogTitle className="sr-only">
            {isVideo ? 'Video Player' : 'Image Viewer'}
          </DialogTitle>
          {isVideo ? (
            <iframe
              src={getYouTubeEmbedUrl(selectedMedia!)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={selectedMedia!}
              alt="Selected media"
              className="w-full h-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}