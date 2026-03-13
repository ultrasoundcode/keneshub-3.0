import Navbar from '@/components/layout/Navbar';
import LandingPage from '@/components/sections/LandingPage';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <LandingPage />
      <Footer />
    </main>
  );
}
