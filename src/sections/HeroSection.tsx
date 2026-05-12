import HeroSlideshow from '../components/HeroSlideshow';
import { useConfig } from '../hooks/useConfig';

export default function HeroSection() {
  const config = useConfig();

  return (
    <section id="hero" className="min-h-screen">
      <HeroSlideshow
        images={config.assets.heroImages}
        logo={config.assets.logo}
        coupleNames={config.couple.displayName}
      />
    </section>
  );
}
