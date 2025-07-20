import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Eye, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/context/AuthContext';
import { FavoritesNotification } from './FavoritesNotification';

const BACKEND_URL = 'http://localhost:8000';

export const ProductsSection = () => {
  const navigate = useNavigate();
  const [isViewAllClicked, setIsViewAllClicked] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/products/`)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : data.results || []));
  }, []);

  const handleProductClick = (productId: number) => {
    navigate(`/produit/${productId}`);
  };

  const handleLikeProduct = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    const wasAdded = toggleFavorite(productId, 'product');
    
    // Show notification if guest user added a favorite
    if (wasAdded && !isAuthenticated) {
      setShowNotification(true);
    }
  };

  const handleViewAllClick = () => {
    setIsViewAllClicked(true);
    setTimeout(() => {
      navigate('/catalogue');
      setIsViewAllClicked(false);
    }, 200);
  };

  const getImageUrl = (img: string) => {
    if (!img) return '/placeholder.svg';
    if (img.startsWith('http')) return img;
    return `${BACKEND_URL}${img}`;
  };

  return (
    <>
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#405B35] mb-4">
              Nouveautés & Populaires
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les dernières créations et les produits les plus appréciés
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.slice(0, 8).map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105 active:scale-95"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative">
                  <img 
                    src={getImageUrl(product.images)} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                      className={`absolute top-2 left-2 ${
                        product.badge === 'Nouveau' ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-[#405B35] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-[#405B35] mb-3">{Number(product.price).toLocaleString()} FCFA</p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white transition-all duration-200 text-sm px-2 py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-sm px-2 py-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product.id);
                        // Optionally, show a toast or alert here
                      }}
                    >
                      Ajouter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={handleViewAllClick}
              className={`bg-[#405B35] hover:bg-[#405B35]/90 text-white px-8 py-3 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto ${
                isViewAllClicked ? 'scale-95 bg-[#405B35]/80' : ''
              }`}
            >
              Voir tous nos produits
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Favorites notification banner */}
      <FavoritesNotification 
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
};
