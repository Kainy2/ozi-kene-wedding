import ScrollTrigger from '../components/ScrollTrigger';
import { useConfig } from '../hooks/useConfig';

export default function StorySection() {
  const config = useConfig();

  return (
    <section id="story" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-16">
            Our Story
          </h2>
        </ScrollTrigger>

        <div className="space-y-16">
          {/* Bride's Story */}
          <ScrollTrigger animation="slide-left">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <img
                  src={config.assets.storyBrideImage}
                  alt={config.couple.bride}
                  className="w-full rounded-lg shadow-xl object-cover aspect-[3/4]"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-serif font-semibold text-wedding-secondary mb-4">
                  {config.couple.bride}'s Story
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {config.content.brideStory}
                </p>
              </div>
            </div>
          </ScrollTrigger>

          {/* Groom's Story */}
          <ScrollTrigger animation="slide-right">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-serif font-semibold text-wedding-primary mb-4">
                  {config.couple.groom}'s Story
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {config.content.groomStory}
                </p>
              </div>
              <div>
                <img
                  src={config.assets.storyGroomImage}
                  alt={config.couple.groom}
                  className="w-full rounded-lg shadow-xl object-cover aspect-[3/4]"
                />
              </div>
            </div>
          </ScrollTrigger>
        </div>
      </div>
    </section>
  );
}
