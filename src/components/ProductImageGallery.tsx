import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn } from 'lucide-react';

interface ProductImageGalleryProps {
  images: string[];
}

export const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Detect if device is touch (mobile/tablet)
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const handleImageClick = () => {
    if (isTouchDevice) setIsZoomed(!isZoomed);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsZoomed(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsZoomed(false);
  };

  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg transition-shadow duration-300">
        <img
          src={hasImages ? images[selectedImage] : '/placeholder.png'}
          alt="Product"
          className={`w-full max-h-[500px] object-contain bg-white cursor-zoom-in transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          style={{ objectFit: 'contain' }}
          onClick={handleImageClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <Button
          size="icon"
          variant="outline"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white shadow"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedImage(index);
                setIsZoomed(false);
              }}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 shadow-sm ${
                selectedImage === index
                  ? 'border-[#405B35] shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
              }`}
              style={{ outline: selectedImage === index ? '2px solid #405B35' : 'none' }}
            >
              <img
                src={image || '/placeholder.png'}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-contain bg-white"
                style={{ objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
