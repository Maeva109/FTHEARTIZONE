import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { FavoritesNotification } from './FavoritesNotification';

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
      <div>
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-3 flex flex-col relative"
              onClick={() => onProductClick(product.id)}
            >
              <div className="relative">
                <img
                  src={Array.isArray(product.images) ? product.images[0] : product.images || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-2"
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
              
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-[#405B35] font-bold">{product.price} FCFA</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorites notification banner */}
      <FavoritesNotification 
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}
