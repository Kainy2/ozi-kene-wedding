import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import HeroSection from '../sections/HeroSection';
import WelcomeSection from '../sections/WelcomeSection';
import WeddingDetailsSection from '../sections/WeddingDetailsSection';
import MapSection from '../sections/MapSection';
import ColorPaletteSection from '../sections/ColorPaletteSection';
import StorySection from '../sections/StorySection';
import RsvpSection from '../sections/RsvpSection';
import FaqSection from '../sections/FaqSection';
import GallerySection from '../sections/GallerySection';
import ClosingSection from '../sections/ClosingSection';
import ContactSection from '../sections/ContactSection';
import { useHashNavigation } from '../hooks/useHashNavigation';

export default function MainPage() {
  const { guestId } = useParams<{ guestId?: string }>();
  const { navigateToSection } = useHashNavigation();

  useEffect(() => {
    // If there's a guest ID in the URL, redirect to RSVP section
    if (guestId) {
      setTimeout(() => {
        navigateToSection('rsvp');
      }, 500);
    }
  }, [guestId, navigateToSection]);

  return (
    <div className="min-h-screen bg-wedding-cream">
      <HamburgerMenu />

      {/* All 11 Sections */}
      <HeroSection />
      <WelcomeSection />
      <WeddingDetailsSection />
      <MapSection />
      <ColorPaletteSection />
      <StorySection />
      <RsvpSection />
      <FaqSection />
      <GallerySection />
      <ClosingSection />
      <ContactSection />
    </div>
  );
}
