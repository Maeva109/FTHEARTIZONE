import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Minus, Plus, ExternalLink, Star, Heart, Truck, Undo, Mail } from 'lucide-react';
import { SocialShare } from '@/components/SocialShare';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  availability: string;
  description: string;
  materials: string;
  dimensions: string;
  variants: string[];
  badge?: string;
  artisan: {
    id: number;
    name: string;
    photo: string;
    city: string;
    country: string;
    shopName?: string;
  };
  is_in_stock: boolean;
  averageRating?: number;
  reviewCount?: number;
}

interface ProductInfoProps {
  product: Product;
  onContactArtisan: () => void;
  onArtisanShopClick?: () => void;
}

// Main product info: title, price, actions, variants, quantity
export const ProductInfoMain = ({ product, onContactArtisan, onArtisanShopClick }: ProductInfoProps) => {
  const variants = product.variants ?? [];
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const BACKEND_URL = 'http://localhost:8000';
  const [addToCartStatus, setAddToCartStatus] = useState<string | null>(null);
  const { fetchCart } = useCart();

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setAddToCartStatus(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product_id: product.id,
          quantity,
        }),
      });
      if (!res.ok) {
        let msg = "Erreur lors de l'ajout au panier.";
        try {
          const data = await res.json();
          if (data && data.error) {
            if (data.error === 'Insufficient stock.') {
              msg = 'Stock insuffisant pour ce produit.';
            } else if (data.error === 'Product not found or inactive.') {
              msg = 'Produit non trouvé ou inactif.';
            } else {
              msg = data.error;
            }
          }
        } catch {}
        setAddToCartStatus(msg);
      } else {
        setAddToCartStatus('Produit ajouté au panier !');
        fetchCart();
      }
    } catch {
      setAddToCartStatus('Erreur réseau.');
    }
  };

  const handleBuyNow = () => {
    console.log('Buy now:', {
      product: product.name,
      quantity,
      variant: selectedVariant
    });
  };

  // Sticky action bar for mobile
  // Only show on small screens
  const [showStickyBar, setShowStickyBar] = useState(false);
  // Show sticky bar when user scrolls past 400px (mobile only)
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (window.innerWidth < 768) {
        setShowStickyBar(window.scrollY > 400);
      }
    };
  }

  return (
    <div className="space-y-8">
      {/* Product Title, Rating, and Badge */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[#405B35]">{product.name}</h1>
          {product.badge && (
            <Badge className={`ml-2 ${product.badge === 'Nouveau' ? 'bg-orange-500' : product.badge === 'Promo' ? 'bg-red-500' : 'bg-green-500'}`}>{product.badge}</Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < Math.round(product.averageRating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-gray-500 text-sm">({product.reviewCount || 0} avis)</span>
        </div>
      </div>

      {/* Price and Stock */}
      <div className="flex flex-col gap-2 mb-2">
        <span className="text-4xl font-extrabold text-[#405B35]">{product.price.toLocaleString()} FCFA</span>
        {product.originalPrice && (
          <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString()} FCFA</span>
        )}
        <span className={`font-semibold ${product.is_in_stock ? 'text-green-600' : 'text-red-500'}`}>{product.is_in_stock ? 'En stock' : 'Rupture de stock'}</span>
      </div>

      {/* Variants Selection */}
      {variants.length > 0 ? (
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Variantes</h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedVariant === variant
                    ? 'border-[#405B35] bg-[#405B35] text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Variantes</h3>
          <span className="italic text-gray-400">Aucune variante</span>
        </div>
      )}

      {/* Quantity and Actions */}
      <div className="bg-gray-50 p-6 rounded-xl shadow flex flex-col gap-4">
        <div className="flex items-center gap-4">
      <div>
            <h3 className="font-semibold text-gray-800 mb-2 text-sm">Quantité</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-bold text-lg">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= 10}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <Button size="lg" className="w-full bg-[#405B35] hover:bg-[#405B35]/90 text-white shadow-lg py-4 text-lg font-semibold" onClick={handleAddToCart}>
            Ajouter au panier
          </Button>
          <Button size="lg" variant="outline" className="w-full border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white py-4 text-lg font-semibold" onClick={handleBuyNow}>
            Acheter maintenant
          </Button>
          <Button variant="outline" size="icon" className="rounded-full shadow-md border-2 border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white transition-colors duration-200 h-12 w-12 self-center md:self-auto">
            <Heart className="h-6 w-6" />
          </Button>
        </div>
        {addToCartStatus && (
          <p className={`mt-2 text-sm text-center ${addToCartStatus.includes('ajout') ? 'text-green-600' : 'text-red-600'}`}>{addToCartStatus}</p>
        )}
      </div>

      {/* Sticky Action Bar for Mobile */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 flex gap-2 p-3 md:hidden">
          <Button size="lg" className="flex-1 bg-[#405B35] hover:bg-[#405B35]/90 text-white font-semibold" onClick={handleAddToCart}>Ajouter au panier</Button>
          <Button size="lg" variant="outline" className="flex-1 border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white font-semibold" onClick={handleBuyNow}>Acheter</Button>
          <Button variant="outline" size="icon" className="rounded-full border-2 border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white h-12 w-12"><Heart className="h-6 w-6" /></Button>
        </div>
      )}
    </div>
  );
};

// Product details section: accordion, seller card, social share
export const ProductDetailsSection = ({ product, onContactArtisan, onArtisanShopClick }: ProductInfoProps) => {
  return (
    <div className="space-y-8">
      {/* Accordion for Details */}
      <Accordion type="single" collapsible defaultValue="description" className="w-full bg-gray-50 rounded-xl shadow-sm p-2">
        <AccordionItem value="description">
          <AccordionTrigger className="text-lg font-bold text-[#405B35] flex items-center gap-2">
            <span><Star className="inline h-5 w-5 text-yellow-400 mr-1" /></span>
            Description
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 leading-relaxed text-base px-2 pb-4">
            {product.description}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="details">
          <AccordionTrigger className="text-lg font-bold text-[#405B35] flex items-center gap-2">
            <span><Badge className="bg-[#405B35] text-white mr-1">i</Badge></span>
            Détails du produit
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-4">
            <ul className="space-y-2 text-gray-700 text-base">
              <li><strong>Matériaux:</strong> {product.materials || 'Non spécifié'}</li>
              <li><strong>Dimensions:</strong> {product.dimensions || 'Non spécifié'}</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="text-lg font-bold text-[#405B35] flex items-center gap-2">
            <Truck className="inline h-5 w-5 text-[#405B35] mr-1" />
            Livraison & Retours
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-700 px-2 pb-4">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 mt-1 text-[#405B35]" />
              <div>
                <h4 className="font-semibold">Livraison Rapide</h4>
                <p>Recevez votre commande sous 2 à 5 jours ouvrés.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Undo className="h-5 w-5 mt-1 text-[#405B35]" />
              <div>
                <h4 className="font-semibold">Retours Faciles</h4>
                <p>Retours acceptés sous 14 jours.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Enhanced Seller Card */}
      <Card className="bg-white rounded-2xl shadow-lg border border-gray-100 mt-8">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <img src={product.artisan?.photo || '/placeholder.png'} alt={product.artisan?.name} className="w-20 h-20 rounded-full object-cover border-4 border-[#EDF0E0] shadow" />
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div>
                <p className="text-sm text-gray-500 mb-1">Vendu par</p>
                <h4 className="font-bold text-xl text-[#405B35] mb-1">{product.artisan?.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.artisan?.city}</p>
              </div>
              <Button variant="outline" onClick={onArtisanShopClick} className="border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white font-semibold px-6 py-2 rounded-lg shadow-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                  Voir la boutique
                </Button>
            </div>
            <div className="border-t border-gray-200 my-4" />
            <div className="flex gap-3">
              <Button onClick={onContactArtisan} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contacter l'artisan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Social Share */}
      <SocialShare productName={product.name} />
    </div>
  );
};
