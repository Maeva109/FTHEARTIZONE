import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { FavoritesNotification } from './FavoritesNotification';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  images?: string;
  description: string;
  badge?: string;
  artisan?: string;
  location?: string;
}

interface ProductGridProps {
  products: Product[];
  onProductClick: (productId: number) => void;
}

const BACKEND_URL = 'https://maekdm.pythonanywhere.com';
const getImageUrl = (img: string) => {
  if (!img) return '/placeholder.png'; // fallback image
  if (img.startsWith('http')) return img;
  return `${BACKEND_URL}${img}`;
};

export const ProductGrid = ({ products, onProductClick }: ProductGridProps) => {
  const { addToCart } = useCart();
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

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0 bg-white"
            onClick={() => onProductClick(product.id)}
          >
            <div className="relative">
              <img 
                src={getImageUrl(product.images)} 
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Heart icon - appears on hover */}
              <button
                onClick={(e) => handleLikeProduct(e, product.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg"
              >
                <Heart 
                  size={20} 
                  className={`transition-colors duration-200 ${
                    isFavorite(product.id, 'product') 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                />
              </button>

              {product.badge && (
                <Badge 
                  className={`absolute top-3 left-3 ${
                    product.badge === 'Nouveau' ? 'bg-orange-500 hover:bg-orange-600' : 
                    product.badge === 'Promo' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white font-semibold`}
                >
                  {product.badge}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-lg">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>
              
              {/* Artisan info */}
              <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-[#405B35] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {product.artisan ? product.artisan.charAt(0) : '?'}
                </div>
                <span>
                  <span className="font-medium">{product.artisan || 'Artisan inconnu'}</span>
                  {product.location && <span className="text-gray-400"> • {product.location}</span>}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-[#405B35]">
                  {product.price.toLocaleString()} FCFA
                </p>
                <Button 
                  size="sm" 
                  className="w-full sm:w-auto bg-[#405B35] hover:bg-[#405B35]/90 text-white font-semibold text-sm px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id, 1);
                  }}
                >
                  <span className="block sm:hidden">Ajouter</span>
                  <span className="hidden sm:block">Ajouter au panier</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Favorites notification banner */}
      <FavoritesNotification 
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
};
