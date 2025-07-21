
import { useEffect, useState } from 'react';
import { Sparkles, Heart, Users, ArrowRight } from 'lucide-react';
import { artisanAPI, BACKEND_URL } from '@/lib/api';

export const ArtisansHeroBanner = () => {
  const [artisans, setArtisans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        const data = await artisanAPI.listValidatedArtisans();
        setArtisans(data.slice(0, 6));
      } catch (e) {
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-orange-200 opacity-50">
        <Sparkles className="h-20 w-20 animate-pulse" />
      </div>
      <div className="absolute top-20 right-20 text-[#405B35] opacity-30">
        <Heart className="h-16 w-16 animate-pulse" />
      </div>
      <div className="container mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Users className="h-10 w-10 text-[#405B35]" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#405B35]">
            Découvrir nos artisans créateurs
          </h1>
          <Sparkles className="h-10 w-10 text-orange-500 animate-pulse" />
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-[#405B35] to-orange-500 mx-auto mb-8 rounded-full"></div>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Rencontrez les artistes passionnés qui donnent vie à chaque création. 
          Découvrez leurs histoires, leurs techniques et laissez-vous inspirer par leur talent unique.
        </p>
        {/* Responsive grid of artisan circles */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-y-8 gap-x-4 justify-items-center max-w-6xl mx-auto">
            {loading ? (
              <div className="text-gray-500 col-span-full">Chargement...</div>
            ) : artisans.length === 0 ? (
              <div className="text-gray-500 col-span-full">Aucun artisan trouvé.</div>
            ) : artisans.map((artisan) => (
              <div
                key={artisan.id}
                className="flex flex-col items-center group focus:outline-none"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white group-hover:scale-105 group-hover:border-orange-400 transition-all duration-200">
                  <img
                    src={artisan.photo_profil
                      ? (artisan.photo_profil.startsWith('http')
                          ? artisan.photo_profil
                          : `${BACKEND_URL}${artisan.photo_profil}`)
                      : '/default-profile.png'}
                    alt={artisan.user?.prenom + ' ' + artisan.user?.nom}
                    onError={e => { e.currentTarget.src = '/default-profile.png'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center max-w-[7.5rem] flex flex-col items-center">
                  <div className="font-semibold text-[#405B35] truncate">{artisan.boutique_id || artisan.user?.prenom}</div>
                  <div className="text-xs text-gray-500 truncate">{artisan.specialty || artisan.city}</div>
                  <a
                    href={`/artisan/${artisan.boutique_id?.toLowerCase().replace(/\s+/g, '-') || artisan.id || 'profile'}`}
                    className="mt-1 flex items-center gap-1 text-[#405B35] hover:text-orange-500 font-medium transition-colors group"
                    aria-label="Voir la boutique"
                  >
                    <span className="text-xs">Voir la boutique</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          {/* Gradient fade on sides (optional, can be removed for grid) */}
        </div>
      </div>
    </section>
  );
};
