import { unstable_cache } from 'next/cache';
import dynamic from 'next/dynamic';
import { Header } from '@/components/landing/Header';
import { InfoBar } from '@/components/landing/InfoBar';
import { HeroSlider } from '@/components/landing/HeroSlider';
import { CategoryCircles } from '@/components/landing/CategoryCircles';
import { HomeClient } from '@/components/landing/HomeClient';
import { Footer } from '@/components/landing/Footer';
import { DeferredSection } from '@/components/DeferredSection';
import { getProducts, getCategories } from '@/lib/server-data';

const Brands = dynamic(
  () => import('@/components/landing/Brands').then((m) => ({ default: m.Brands })),
  { loading: () => <div className="min-h-[200px]" aria-hidden /> }
);

const LocationSection = dynamic(
  () => import('@/components/LocationSection').then((m) => ({ default: m.LocationSection })),
  { loading: () => <div className="min-h-[400px] bg-black" aria-hidden /> }
);

export const revalidate = 300;

const getHomeData = unstable_cache(
  async () => {
    const [products, categories] = await Promise.all([
      getProducts({ listing: true, limit: 40 }),
      getCategories(),
    ]);
    return { products, categories };
  },
  ['home-page-data'],
  { revalidate: 300 }
);

export default async function Home() {
  const { products, categories } = await getHomeData();

  return (
    <main className="min-h-screen bg-white text-black dark:bg-bg-main dark:text-text-main">
      <Header />
      <InfoBar />
      <HeroSlider />
      <CategoryCircles categories={categories} />
      <DeferredSection
        rootMargin="200px"
        fallback={<div className="min-h-[560px] bg-white" aria-hidden />}
      >
        <HomeClient products={products} />
      </DeferredSection>
      <DeferredSection
        fallback={<div className="min-h-[320px]" aria-hidden />}
      >
        <Brands />
        <LocationSection />
      </DeferredSection>
      <Footer />
    </main>
  );
}
