import ScrollTrigger from '../components/ScrollTrigger';
import { useConfig } from '../hooks/useConfig';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function WeddingDetailsSection() {
  const config = useConfig();

  return (
    <section
      id="details"
      className="py-20 px-6 bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${config.assets.weddingDetailsBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-wedding-cream/95" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-16">
            Wedding Details
          </h2>
        </ScrollTrigger>

        {/* Day 1 - September 12 */}
        <ScrollTrigger animation="fade-up">
          <div className="mb-16">
            <h3 className="text-3xl font-serif font-semibold text-wedding-primary text-center mb-10">
              {config.events.day1.date}
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Church Ceremony */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-wedding-primary" size={24} />
                  <h4 className="text-xl font-serif font-semibold text-wedding-navy">
                    Church Ceremony
                  </h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <Clock className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <p>{config.events.day1.church.time}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="font-semibold">{config.events.day1.church.name}</p>
                      <p className="text-sm">{config.events.day1.church.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reception */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-wedding-primary" size={24} />
                  <h4 className="text-xl font-serif font-semibold text-wedding-navy">
                    Reception
                  </h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <Clock className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <p>{config.events.day1.reception.time}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="font-semibold">{config.events.day1.reception.name}</p>
                      <p className="text-sm">{config.events.day1.reception.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* After Party */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-wedding-primary" size={24} />
                  <h4 className="text-xl font-serif font-semibold text-wedding-navy">
                    After Party
                  </h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <Clock className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <p>{config.events.day1.afterParty.time}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <div>
                      <p className="font-semibold">{config.events.day1.afterParty.venue}</p>
                      <p className="text-sm">{config.events.day1.afterParty.address}</p>
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-600 mt-3">{config.events.day1.afterParty.note}</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollTrigger>

        {/* Day 2 - September 13 */}
        <ScrollTrigger animation="fade-up">
          <div>
            <h3 className="text-3xl font-serif font-semibold text-wedding-primary text-center mb-10">
              {config.events.day2.date}
            </h3>

            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-wedding-primary" size={24} />
                  <h4 className="text-xl font-serif font-semibold text-wedding-navy">
                    {config.events.day2.thanksgiving.name}
                  </h4>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-2">
                    <Clock className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <p>{config.events.day2.thanksgiving.time}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-wedding-secondary flex-shrink-0 mt-1" size={18} />
                    <p className="text-sm">{config.events.day2.thanksgiving.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
