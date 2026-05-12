import ScrollTrigger from '../components/ScrollTrigger';
import ColorSwatch from '../components/ColorSwatch';
import { useConfig } from '../hooks/useConfig';

export default function ColorPaletteSection() {
  const config = useConfig();

  return (
    <section id="colors" className="py-20 px-6 bg-wedding-cream">
      <div className="max-w-5xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-8">
            Our Color Palette
          </h2>
          <p className="text-center text-gray-700 mb-16 max-w-2xl mx-auto">
            These are the colors of our special day. Feel free to incorporate them into your attire if you'd like!
          </p>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {config.colors.map((color, index) => (
              <div key={index}>
                <ColorSwatch
                  name={color.name}
                  hex={color.hex}
                  role={color.role}
                />
              </div>
            ))}
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
