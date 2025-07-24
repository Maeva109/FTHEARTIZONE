import React, { useEffect, useState } from 'react';
import { Check, Users, Globe, MapPin, Package, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function ArtisansMap() {
  const [stats, setStats] = useState({
    artisans: 0,
    regions: 0,
    departments: 0,
    products: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://maekdm.pythonanywhere.com/api/artisans/stats/')
      .then(res => setStats(res.data))
      .catch(() => setError('Erreur de chargement des statistiques.'));
  }, []);

  const statItems = [
    { number: stats.artisans, label: 'ARTISANS', icon: Users },
    { number: stats.regions, label: 'RÉGIONS', icon: Globe },
    { number: stats.departments, label: 'DÉPARTEMENTS', icon: MapPin },
    { number: stats.products, label: 'PRODUITS', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* Top Section - Statistics */}
      <section className="bg-white py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-800">
                Carte des artisans. Voir profils.
              </h1>
              <Check className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {statItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mx-auto mb-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200">
                      <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-green-700" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">
                        {item.number}
                      </span>
                    </div>
                  </div>
                  <p className="text-orange-500 font-semibold text-sm md:text-base">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          {error && (
            <div className="text-center mt-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="bg-green-800 h-1 w-full"></div>

      {/* Bottom Section - Map and Description */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Description */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6">
                Tous nos artisans créateurs
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base md:text-lg">
                  Afin de vous aider à choisir parmi tous les produits faits main de notre boutique d'artisans créateurs, nous avons développé cette carte interactive qui vous permet de découvrir les talents locaux.
                </p>
                <p className="text-base md:text-lg">
                  Cette carte regroupe tous les artisans créateurs partenaires de notre plateforme, organisés par régions et départements pour faciliter votre recherche.
                </p>
                <p className="text-base md:text-lg">
                  Choisissez les régions et départements qui vous intéressent et découvrez leurs créations originales directement depuis leur boutique en ligne.
                </p>
                <p className="text-base md:text-lg">
                  N'attendez plus pour découvrir ces artisans créateurs talentueux et leurs œuvres uniques !
                </p>
              </div>
            </div>

            {/* Right: Map */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                  <div className="relative bg-green-50 rounded-lg p-6 md:p-8 min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/Ouest%20.png" 
                      alt="Carte des départements" 
                      className="w-full h-auto max-w-md object-contain"
                    />
                    
                    {/* Interactive overlay points */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Example artisan locations */}
                      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="bg-green-800 hover:bg-green-900 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <span className="font-semibold">0 FCFA</span>
        </Button>
      </div>
    </div>
  );
} 