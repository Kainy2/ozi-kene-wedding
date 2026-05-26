import ScrollTrigger from '../components/ScrollTrigger';
import { useConfig } from '../hooks/useConfig';

export default function MapSection() {
  const config = useConfig();

  return (
    <section id="map" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-16">
            How to Get There
          </h2>
        </ScrollTrigger>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Church Map */}
          <ScrollTrigger animation="slide-left">
            <div>
              <h3 className="text-2xl font-serif font-semibold text-wedding-primary mb-4">
                Church Location
              </h3>
              <p className="text-gray-700 mb-4">{config.events.day1.church.name}</p>
              <div
                className="rounded-lg overflow-hidden shadow-lg w-full [&_iframe]:w-full [&_iframe]:block [&_iframe]:max-w-full"
                dangerouslySetInnerHTML={{ __html: config.events.day1.church.embedUrl }}
              />
              {config.events.day1.church.mapLink && (
                <a
                  href={config.events.day1.church.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-wedding-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
                >
                  Open in Google Maps
                </a>
              )}
            </div>
          </ScrollTrigger>

          {/* Reception Map */}
          <ScrollTrigger animation="slide-right">
            <div>
              <h3 className="text-2xl font-serif font-semibold text-wedding-primary mb-4">
                Reception Venue
              </h3>
              <p className="text-gray-700 mb-4">{config.events.day1.reception.name}</p>
              {config.events.day1.reception.embedUrl ? (
                <>
                  <div
                    className="rounded-lg overflow-hidden shadow-lg w-full [&_iframe]:w-full [&_iframe]:block [&_iframe]:max-w-full"
                    dangerouslySetInnerHTML={{ __html: config.events.day1.reception.embedUrl }}
                  />
                  {config.events.day1.reception.mapLink && (
                    <a
                      href={config.events.day1.reception.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-6 py-2 bg-wedding-primary text-white rounded-lg hover:bg-opacity-90 transition-all"
                    >
                      Open in Google Maps
                    </a>
                  )}
                </>
              ) : (
                <div className="bg-wedding-nude rounded-lg p-8 text-center text-gray-600">
                  <p>Map coming soon</p>
                  <p className="text-sm mt-2">{config.events.day1.reception.address}</p>
                </div>
              )}
            </div>
          </ScrollTrigger>
        </div>
      </div>
    </section>
  );
}
