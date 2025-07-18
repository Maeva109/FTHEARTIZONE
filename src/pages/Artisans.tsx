import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArtisansBreadcrumb } from '@/components/artisans/ArtisansBreadcrumb';
import { ArtisansHeroBanner } from '@/components/artisans/ArtisansHeroBanner';
import React, { Suspense, useState, useEffect } from 'react';
import { FloatingCart } from '@/components/FloatingCart';

const ArtisansMap = React.lazy(() => import('@/components/artisans/ArtisansMap'));
import { ArtisansGrid } from '@/components/artisans/ArtisansGrid';

const Artisans = () => {
  const [headerOffset, setHeaderOffset] = useState(104); // default: both rows visible

  useEffect(() => {
    const handleHeaderState = (e: any) => {
      setHeaderOffset(e.detail.hideTopRow ? 56 : 104);
    };
    window.addEventListener('header-row-toggle', handleHeaderState);
    return () => window.removeEventListener('header-row-toggle', handleHeaderState);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-2" style={{ marginTop: `${headerOffset}px` }}>
        <ArtisansBreadcrumb />
        <ArtisansHeroBanner />
        <Suspense fallback={<div>Chargement de la carte...</div>}>
          <ArtisansMap />
        </Suspense>
        <ArtisansGrid />
      </main>
      <Footer />
      <FloatingCart />
    </div>
  );
};

export default Artisans;
