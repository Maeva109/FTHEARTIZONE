import { useEffect, useState } from 'react';
import { Users, Globe, MapPin, Package, Check, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Charte graphique
const COLORS = {
  primary: '#14532d',      // Vert profond
  secondary: '#ff9800',    // Orange
  background: '#e6f4ea',   // Vert clair doux
  text: '#2d3a4a',         // Gris foncé
  error: '#e53935',        // Rouge
  success: '#43a047',      // Vert
};

export const ArtisansMap = () => {
  const [stats, setStats] = useState({
    artisans: 0,
    regions: 0,
    departments: 0,
    products: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/artisans/stats/')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setError('Erreur de chargement des statistiques.'));
  }, []);

  const statItems = [
    { number: stats.artisans, label: 'ARTISANS', icon: Users },
    { number: stats.regions, label: 'RÉGIONS', icon: Globe },
    { number: stats.departments, label: 'DÉPARTEMENTS', icon: MapPin },
    { number: stats.products, label: 'PRODUITS', icon: Package },
  ];

  return (
    <div style={{ background: COLORS.background, minHeight: '100vh', fontFamily: 'Montserrat, Arial, sans-serif' }} className="overflow-x-hidden">
      {/* Top Section - Statistics */}
      <section className="bg-white py-8 sm:py-12 md:py-16 px-2 sm:px-3 md:px-4">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 px-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold break-words leading-tight" style={{ color: COLORS.primary }}>
                Carte des artisans. Voir profils.
              </h1>
              <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 flex-shrink-0" style={{ color: COLORS.primary }} />
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 px-1">
            {statItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mx-auto mb-2 sm:mb-3">
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border-2 transition-transform duration-300 hover:scale-105 cursor-pointer relative min-h-[48px] min-w-[48px]"
          style={{
                        background: COLORS.background, 
                        borderColor: COLORS.primary 
                      }}
                    >
                      <IconComponent 
                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" 
                        style={{ color: COLORS.primary, opacity: 0.7 }} 
                      />
                      {/* Number badge positioned correctly */}
                      <div 
                        className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center"
                        style={{ background: COLORS.primary }}
                      >
                        <span className="text-white font-bold text-xs sm:text-sm">
                          {item.number}
          </span>
        </div>
                    </div>
                  </div>
                  <p 
                    className="font-semibold text-xs sm:text-sm md:text-base break-words"
                    style={{ color: COLORS.secondary }}
                  >
                    {item.label}
                  </p>
              </div>
              );
            })}
              </div>

          {error && (
            <div className="text-center mt-4 sm:mt-6 px-2">
              <p style={{ color: COLORS.error }} className="text-xs sm:text-sm">{error}</p>
            </div>
          )}
        </div>
      </section>

      {/* Subtle Section Divider */}
      <div className="bg-white">
        <div className="w-full max-w-6xl mx-auto">
          <div className="h-px bg-gray-200 mx-2 sm:mx-3 md:mx-4"></div>
        </div>
      </div>

      {/* Bottom Section - Map and Description */}
      <section className="py-8 sm:py-12 md:py-16 px-2 sm:px-3 md:px-4" style={{ background: COLORS.background }}>
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left: Description */}
            <div className="order-2 lg:order-1">
              <h2 
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 break-words leading-tight"
                style={{ color: COLORS.primary }}
          >
            Tous nos artisans créateurs
              </h2>
              <div className="space-y-3 sm:space-y-4 leading-relaxed">
                <p 
                  className="text-sm sm:text-base md:text-lg break-words"
                  style={{ color: COLORS.text }}
                >
                  Afin de vous aider à choisir parmi tous les produits faits main de notre boutique d'artisans créateurs, nous avons développé cette carte interactive qui vous permet de découvrir les talents locaux.
                </p>
                <p 
                  className="text-sm sm:text-base md:text-lg break-words"
                  style={{ color: COLORS.text }}
                >
                  Cette carte regroupe tous les artisans créateurs partenaires de notre plateforme, organisés par régions et départements pour faciliter votre recherche.
                </p>
                <p 
                  className="text-sm sm:text-base md:text-lg break-words"
                  style={{ color: COLORS.text }}
                >
                  Choisissez les régions et départements qui vous intéressent et découvrez leurs créations originales directement depuis leur boutique en ligne.
                </p>
                <p 
                  className="text-sm sm:text-base md:text-lg break-words"
                  style={{ color: COLORS.text }}
                >
                  N'attendez plus pour découvrir ces artisans créateurs talentueux et leurs œuvres uniques !
          </p>
        </div>
            </div>

            {/* Right: Map */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-8">
                  <div 
                    className="relative rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] flex items-center justify-center"
                    style={{ background: COLORS.background }}
                  >
          <img
            src="/lovable-uploads/Ouest.png"
            alt="Carte des départements"
                      className="w-full h-auto max-w-[220px] sm:max-w-[250px] md:max-w-xs lg:max-w-sm xl:max-w-md object-contain"
                      style={{ maxWidth: '100%' }}
                    />
                    
                    {/* Interactive overlay points */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Example artisan locations */}
                      <div 
                        className="absolute top-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                        style={{ background: COLORS.secondary }}
                      ></div>
                      <div 
                        className="absolute top-1/3 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                        style={{ background: COLORS.secondary }}
                      ></div>
                      <div 
                        className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                        style={{ background: COLORS.secondary }}
                      ></div>
                      <div 
                        className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full animate-pulse"
                        style={{ background: COLORS.secondary }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button 
          className="px-3 py-2 sm:px-4 sm:py-3 rounded-full shadow-lg flex items-center gap-1 sm:gap-2 min-h-[44px] min-w-[44px]"
          style={{ background: COLORS.primary }}
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="font-semibold text-white text-xs sm:text-sm">0 FCFA</span>
        </Button>
      </div>
    </div>
  );
};

export default ArtisansMap;
