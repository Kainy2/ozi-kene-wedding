import ScrollTrigger from '../components/ScrollTrigger';
import { useConfig } from '../hooks/useConfig';

export default function WelcomeSection() {
  const config = useConfig();

  return (
    <section id="welcome" className="py-20 px-6 bg-wedding-cream">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy mb-8">
            WELCOME
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {config.content.welcomeMessage}
          </p>
        </ScrollTrigger>
      </div>
    </section>
  );
}
