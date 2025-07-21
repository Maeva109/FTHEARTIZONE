
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Star } from 'lucide-react';
import { artisanAPI, BACKEND_URL } from '@/lib/api';

const specialties = [
  'Toutes les spécialités',
  'Poterie',
  'Sculpture',
  'Tissage',
  'Vannerie',
  'Bijouterie',
  'Maroquinerie',
];
const regions = [
  'Toutes les régions',
  'Adamaoua', 'Centre', 'Est', 'Extrême-Nord', 'Littoral',
  'Nord', 'Nord-Ouest', 'Ouest', 'Sud', 'Sud-Ouest',
];

const PAGE_SIZE = 3;

export const ArtisansGrid = () => {
  const [artisans, setArtisans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Toutes les spécialités');
  const [selectedRegion, setSelectedRegion] = useState('Toutes les régions');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fetchArtisans = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters: Record<string, string> = {};
      if (search) filters.nom = search;
      if (selectedRegion !== 'Toutes les régions') filters.region = selectedRegion;
      if (selectedSpecialty !== 'Toutes les spécialités') filters.specialty = selectedSpecialty;
      const data = await artisanAPI.listValidatedArtisansWithFilters(filters);
      setArtisans(data);
      setVisibleCount(PAGE_SIZE); // Reset pagination on new search/filter
    } catch (e) {
      setError("Erreur lors du chargement des artisans.");
      setArtisans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtisans();
    // eslint-disable-next-line
  }, [search, selectedSpecialty, selectedRegion]);

  const handleVoirPlus = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, artisans.length));
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 bg-white overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#405B35] mb-3 sm:mb-4 text-center break-words">
            Tous nos artisans créateurs
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Découvrez les talents exceptionnels de nos artisans camerounais et leurs créations uniques
          </p>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                placeholder="Rechercher un artisan, une spécialité..."
                className="pl-9 sm:pl-10 py-2 sm:py-3 text-sm sm:text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <select
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#405B35] focus:border-transparent text-sm sm:text-base"
                value={selectedSpecialty}
                onChange={e => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#405B35] focus:border-transparent text-sm sm:text-base"
                value={selectedRegion}
                onChange={e => setSelectedRegion(e.target.value)}
              >
                {regions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Artisans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500 text-sm sm:text-base">Chargement...</div>
          ) : error ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-red-500 text-sm sm:text-base">{error}</div>
          ) : artisans.length === 0 ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500 text-sm sm:text-base">Aucun artisan trouvé.</div>
          ) : artisans.slice(0, visibleCount).map((artisan) => (
            <Card key={artisan.id} className="hover:shadow-lg transition-shadow duration-300 group">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="relative mb-3 sm:mb-4">
                    <img
                      src={artisan.photo_profil
                        ? (artisan.photo_profil.startsWith('http')
                            ? artisan.photo_profil
                            : `${BACKEND_URL}${artisan.photo_profil}`)
                        : '/default-profile.png'}
                      alt={artisan.user?.prenom + ' ' + artisan.user?.nom}
                      onError={e => { e.currentTarget.src = '/default-profile.png'; }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#405B35] mb-1 break-words">{artisan.user?.prenom} {artisan.user?.nom}</h3>
                  <p className="text-base sm:text-lg font-medium text-gray-700 mb-2 break-words">{artisan.boutique_id}</p>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 break-words">{artisan.description_artisan?.slice(0, 40)}...</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-500 break-words">{artisan.ville}, {artisan.region}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base">{artisan.rating ?? 'N/A'}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">({artisan.review_count ?? 0} avis)</span>
                  </div>
                  <Button 
                    className="w-full bg-[#405B35] hover:bg-[#405B35]/90 text-white text-sm sm:text-base py-2 sm:py-3"
                    asChild
                  >
                    <a href={`/artisan/${artisan.boutique_id?.toLowerCase().replace(/\s+/g, '-') || artisan.id || 'profile'}`}>
                      Voir la boutique
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more button */}
        {visibleCount < artisans.length && !loading && !error && (
          <div className="text-center mt-8 sm:mt-12">
            <Button 
              variant="outline" 
              className="border-[#405B35] text-[#405B35] hover:bg-[#405B35] hover:text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
              onClick={handleVoirPlus}
            >
              Voir plus d'artisans
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
