import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { FavoritesNotification } from './FavoritesNotification';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: string;
  images?: string[];
}

interface RelatedProductsProps {
  title: string;
  products: RelatedProduct[];
  onProductClick: (productId: number) => void;
}

export function RelatedProducts({ title, products, onProductClick }: RelatedProductsProps) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [showNotification, setShowNotification] = useState(false);

  const handleLikeProduct = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    const wasAdded = toggleFavorite(productId, 'product');
    
    // Show notification if guest user added a favorite
    if (wasAdded && !isAuthenticated) {
      setShowNotification(true);
    }
  };

  if (!products.length) return null;
  
  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
        <h3 className="text-2xl font-bold text-[#405B35]">{title}</h3>
        {/* <span className="text-gray-500 text-sm">Découvrez d’autres créations artisanales</span> */}
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map(product => {
            let imageSrc = '/placeholder.png';
            if (Array.isArray(product.images) && product.images.length > 0) {
              imageSrc = product.images[0];
            } else if (typeof product.images === 'string' && product.images) {
              imageSrc = product.images;
            }
            return (
              <CarouselItem key={product.id} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2">
                <div
                  className="group bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-3 flex flex-col relative h-full"
                  onClick={() => onProductClick(product.id)}
                >
                  <div className="relative">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded mb-2 transition-transform duration-200 group-hover:scale-105"
                    />
                    {/* Heart icon - appears on hover */}
                    <button
                      onClick={(e) => handleLikeProduct(e, product.id)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg"
                    >
                      <Heart
                        size={16}
                        className={`transition-colors duration-200 ${
                          isFavorite(product.id, 'product')
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-600 hover:text-red-500'
                        }`}
                      />
                    </button>
                    {product.badge && (
                      <span className="absolute top-2 left-2 inline-block px-2 py-0.5 text-xs rounded bg-orange-100 text-orange-700">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="font-semibold mb-1 line-clamp-2 min-h-[2.5em]">{product.name}</div>
                    <div className="text-[#405B35] font-bold">{product.price} FCFA</div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* Favorites notification banner */}
      <FavoritesNotification 
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}
