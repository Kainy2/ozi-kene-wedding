import ScrollTrigger from '../components/ScrollTrigger';
import { useConfig } from '../hooks/useConfig';
import { Phone } from 'lucide-react';

export default function ContactSection() {
  const config = useConfig();

  return (
    <section id="contact" className="py-20 px-6 bg-wedding-navy text-white">
      <div className="max-w-4xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
            Get In Touch
          </h2>
          <p className="text-center text-white/80 mb-16">
            Have questions? Feel free to reach out to our contact persons
          </p>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up">
          <div className="grid md:grid-cols-2 gap-8">
            {config.contacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center hover:bg-white/15 transition-colors"
              >
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  {contact.name}
                </h3>
                <div className="flex flex-col items-center gap-3">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-2 text-wedding-peach hover:text-white transition-colors"
                  >
                    <Phone size={18} />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up">
          <div className="mt-16 text-center border-t border-white/20 pt-8">
            <p className="text-white/60 text-sm">
              © 2026 {config.couple.displayName}. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Built with love
            </p>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
