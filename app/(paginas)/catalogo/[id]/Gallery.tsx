"use client"
import React, { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GalleryProps {
  gallery?: string[];
  youtubeUrl?: string[];
  financingOptions?: any
}

export default function Gallery({ gallery, youtubeURL, financingOptions }: { gallery: string[], youtubeURL?: string[], financingOptions?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout| undefined>(undefined);

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

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

  const updateGallery = (index: number) => {
    const normalizedIndex = (index + gallery.length) % gallery.length;
    setCurrentIndex(normalizedIndex);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: (normalizedIndex * scrollContainerRef.current.offsetWidth),
        behavior: 'smooth'
      });
    }
  };

  const handleClose = () => {
    setSelectedMedia(null);
    setIsVideo(false);
  };

  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set new timeout
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      if (scrollContainerRef.current) {
        const scrollPosition = scrollContainerRef.current.scrollLeft;
        const imageWidth = scrollContainerRef.current.offsetWidth;
        const newIndex = Math.round(scrollPosition / imageWidth);
        setCurrentIndex(newIndex);
      }
    }, 150); // Ajustado el tiempo para que sea más suave
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-12">
      <div className="relative w-full md:w-2/3">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-hide md:overflow-hidden rounded-lg"
          onScroll={handleScroll}
        >
          {gallery.map((image, index) => (
            <div
              key={index}
              className="flex-none w-full snap-center"
            >
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>

        <button
          className="prev hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
          onClick={() => updateGallery(currentIndex - 1)}
        >
          ‹
        </button>
        <button
          className="next hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
          onClick={() => updateGallery(currentIndex + 1)}
        >
          ›
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {gallery.map((_image, index) => (
            <button
              key={index}
              className={`dot w-3 h-3 rounded-full transition-colors duration-300 ease-in-out ${
                index === currentIndex ? "bg-indigo-600" : "bg-gray-400"
              }`}
              onClick={() => updateGallery(index)}
            ></button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3">
        {(youtubeURL ?? []).length > 0 && (
         <h2 className="text-2xl font-bold mb-6">Video relacionado</h2>
        )}
        
        {youtubeURL?.map((url, index) => (
          <div key={`video-${index}`} className="rounded-lg overflow-hidden shadow-lg h-64 relative group cursor-pointer" onClick={() => handleMediaClick(url, true)}>
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