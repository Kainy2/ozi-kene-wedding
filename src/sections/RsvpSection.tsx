import { useParams } from 'react-router-dom';
import ScrollTrigger from '../components/ScrollTrigger';
import RsvpForm from '../components/RsvpForm';
import { useConfig } from '../hooks/useConfig';
import { useGuest } from '../hooks/useRsvp';
import { Calendar } from 'lucide-react';

export default function RsvpSection() {
  const config = useConfig();
  const { guestId } = useParams<{ guestId?: string }>();
  const { data: guest, isLoading } = useGuest(guestId);

  return (
    <section id="rsvp" className="py-20 px-6 bg-wedding-peach/20">
      <div className="max-w-3xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-6">
            RSVP
          </h2>

          <div className="flex items-center justify-center gap-2 text-wedding-secondary mb-12">
            <Calendar size={20} />
            <p className="text-lg">
              Please respond by <span className="font-semibold">{config.content.rsvpDeadline}</span>
            </p>
          </div>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
            {guest && 'name' in guest && guest.name && !isLoading && (
              <div className="mb-8 text-center">
                <p className="text-lg text-gray-700">
                  Hello, <span className="font-semibold text-wedding-primary">{guest.name}</span>!
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  We're so glad you could make it
                </p>
              </div>
            )}

            <RsvpForm
              guestId={guest && 'id' in guest ? guest.id : undefined}
              guestName={guest && 'name' in guest ? guest.name : undefined}
              guestEmail={guest && 'email' in guest ? guest.email : undefined}
              guestPhone={guest && 'phone' in guest ? guest.phone : undefined}
              hasExistingRsvp={guest && 'rsvp' in guest ? !!guest.rsvp : false}
            />
          </div>
        </ScrollTrigger>
      </div>
    </section>
  );
}
