import { Header } from '@/components/landing/Header';
import { InfoBar } from '@/components/landing/InfoBar';
import { HeroSlider } from '@/components/landing/HeroSlider';
import { CategoryCircles } from '@/components/landing/CategoryCircles';
import { HomeClient } from '@/components/landing/HomeClient';
import { Brands } from '@/components/landing/Brands';
import { LocationSection } from '@/components/LocationSection';
import { Footer } from '@/components/landing/Footer';
import { getProducts, getCategories } from '@/lib/server-data';

export const revalidate = 60;

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts({ listing: true }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-white text-black dark:bg-bg-main dark:text-text-main">
      <Header />
      <InfoBar />
      <HeroSlider />
      <div className="[content-visibility:auto]">
        <CategoryCircles categories={categories} />
        <HomeClient products={products} />
      </div>
      <Brands />
      <LocationSection />
      <Footer />
    </main>
  );
}
