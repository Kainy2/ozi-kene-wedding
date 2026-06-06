import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, AlertCircle, Heart, HeartCrack } from 'lucide-react';
import { useGuest } from '../hooks/useRsvp';
import RsvpForm from '../components/RsvpForm';
import { useConfig } from '../hooks/useConfig';

export default function RsvpPage() {
  const { guestId } = useParams<{ guestId: string }>();
  const config = useConfig();
  const { data: guest, isLoading, error } = useGuest(guestId);
  const [showInvalidBanner, setShowInvalidBanner] = useState(false);

  // Show invalid banner for 10 seconds when token not found
  useEffect(() => {
    if (error && guestId) {
      setShowInvalidBanner(true);
      const timer = setTimeout(() => setShowInvalidBanner(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [error, guestId]);

  const isApproved =
    guest && 'status' in guest && guest.status === 'APPROVED' && 'rsvp' in guest && guest.rsvp;

  const isPending =
    guest && 'status' in guest && guest.status === 'PENDING';

  const isAwaitingRsvp =
    guest && 'status' in guest && guest.status === 'APPROVED' && !('rsvp' in guest && guest.rsvp);

  const isPendingToken = guest && 'isPendingToken' in guest && guest.isPendingToken;

  return (
    <div className="min-h-screen bg-wedding-cream flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-wedding-nude/30 py-4 px-6">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <img
            src={config.assets.logoBlack}
            alt={config.couple.displayName}
            className="h-10 object-contain"
          />
          <Link
            to="/"
            className="text-sm text-wedding-primary font-medium hover:underline"
          >
            View wedding website →
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-xl">

          {/* Invalid token banner */}
          <AnimatePresence>
            {showInvalidBanner && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 text-sm"
              >
                <AlertCircle className="flex-shrink-0 mt-0.5" size={16} />
                <span>This invite link is invalid or no longer exists. You can still RSVP below.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading */}
          {isLoading && (
            <div className="text-center py-16 text-gray-500">
              <div className="w-8 h-8 border-2 border-wedding-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading your invite...</p>
            </div>
          )}

          {/* Approved guest with confirmed RSVP */}
          {!isLoading && isApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-wedding-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Check className="text-wedding-primary" size={32} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-wedding-navy mb-2">
                You're on the list!
              </h2>
              <p className="text-gray-500 text-sm mb-8">Your RSVP has been confirmed.</p>

              <div className="bg-wedding-cream rounded-xl p-6 text-left space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-wedding-secondary mb-1">Name</p>
                  <p className="text-wedding-charcoal font-semibold">{(guest).name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-wedding-secondary mb-1">Email</p>
                  <p className="text-wedding-charcoal font-semibold">{(guest).email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-wedding-secondary mb-1">RSVP Status</p>
                  <div className="flex items-center gap-2">
                    {guest.rsvp?.status === 'ATTENDING' ? (
                      <>
                        <Heart className="text-wedding-primary fill-wedding-primary" size={16} />
                        <p className="text-wedding-primary font-semibold">Joyfully Attending</p>
                      </>
                    ) : (
                      <>
                        <HeartCrack className="text-gray-400" size={16} />
                        <p className="text-gray-500 font-semibold">Regretfully Declined</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-6">
                Check your email for details and your entry QR code.
              </p>
            </motion.div>
          )}

          {/* Pending approval */}
          {!isLoading && isPending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-wedding-peach/40 rounded-full flex items-center justify-center mx-auto mb-5">
                <Clock className="text-wedding-secondary" size={32} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-wedding-navy mb-2">
                RSVP Received
              </h2>
              <p className="text-gray-600 mb-2">
                Thank you, <span className="font-semibold text-wedding-primary">{guest.name}</span>!
              </p>
              <p className="text-gray-500 text-sm">
                Your RSVP is awaiting confirmation from the couple. You'll receive an email once it's approved.
              </p>
            </motion.div>
          )}

          {/* Approved but hasn't RSVPd yet — show the form */}
          {!isLoading && (isAwaitingRsvp || isPendingToken || (!guest && !error) || (error && !showInvalidBanner) || (error && showInvalidBanner)) && !isPending && !isApproved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-serif font-bold text-wedding-navy text-center mb-2">
                RSVP
              </h2>
              <p className="text-center text-gray-500 text-sm mb-8">
                {config.couple.displayName} · {config.events.day1.date}
              </p>

              {isAwaitingRsvp && 'name' in guest! && (
                <div className="mb-6 text-center">
                  <p className="text-gray-700">
                    Hello, <span className="font-semibold text-wedding-primary">{guest.name}</span>!
                  </p>
                  <p className="text-sm text-gray-500 mt-1">We're so glad you could make it</p>
                </div>
              )}

              <RsvpForm
                guestId={
                  isAwaitingRsvp && 'id' in guest!
                    ? guest.id
                    : isPendingToken && 'token' in guest!
                    ? guest.token
                    : undefined
                }
                guestName={isAwaitingRsvp && 'name' in guest! ? guest.name : undefined}
                guestEmail={isAwaitingRsvp && 'email' in guest! ? guest.email : undefined}
                guestPhone={isAwaitingRsvp && 'phone' in guest! ? guest.phone : undefined}
              />
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
