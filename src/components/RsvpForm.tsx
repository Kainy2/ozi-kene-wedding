import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSubmitRsvp } from '../hooks/useRsvp';
import { Check, Heart, HeartCrack, Loader2 } from 'lucide-react';

interface RsvpFormProps {
  guestId?: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  hasExistingRsvp?: boolean;
}

export default function RsvpForm({
  guestId,
  guestName,
  guestEmail,
  guestPhone,
  hasExistingRsvp,
}: RsvpFormProps) {
  const [name, setName] = useState(guestName || '');
  const [email, setEmail] = useState(guestEmail || '');
  const [phone, setPhone] = useState(guestPhone || '');
  const [status, setStatus] = useState<'ATTENDING' | 'NOT_ATTENDING' | null>(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(hasExistingRsvp || false);

  const { mutate, isPending, error } = useSubmitRsvp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!status || !name.trim()) return;

    mutate(
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        status,
        message: message.trim() || undefined,
        guestId,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
      }
    );
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-wedding-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-wedding-primary" />
        </div>
        <h3 className="text-2xl font-serif text-wedding-navy mb-3">
          Thank You!
        </h3>
        <p className="text-gray-700 max-w-md mx-auto">
          {status === 'ATTENDING'
            ? "We can't wait to celebrate with you! Check your email for more details."
            : "We're sorry you can't make it. We'll miss you!"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto"
    >
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-wedding-navy mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={!!guestName}
          className="input-field disabled:bg-wedding-cream disabled:cursor-not-allowed"
          placeholder="Enter your name"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-wedding-navy mb-2">
          Email Address <span className="text-red-400">*</span>
          {/* <span className="text-gray-600 text-xs">(optional)</span> */}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!guestEmail}
          className="input-field disabled:bg-wedding-cream disabled:cursor-not-allowed"
          placeholder="your@email.com"
        />
        <p className="text-xs text-gray-600 mt-1">
          We'll send you event details and venue directions
        </p>
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-wedding-navy mb-2">
          Phone Number <span className="text-gray-600 text-xs">(optional)</span>
        </label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!!guestPhone}
          className="input-field disabled:bg-wedding-cream disabled:cursor-not-allowed appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="07012345678"
          pattern="^(070|080|081|090|091)\d{8}$"
        />
      </div>

      {/* RSVP Status */}
      <div>
        <label className="block text-sm font-medium text-wedding-navy mb-3">
          Will you be attending? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setStatus('ATTENDING')}
            className={`p-4 rounded-xl border-2 transition-all ${
              status === 'ATTENDING'
                ? 'border-wedding-primary bg-wedding-primary/10 text-wedding-navy'
                : 'border-wedding-nude/50 hover:border-wedding-primary'
            }`}
          >
            <Heart
              className={`w-6 h-6 mx-auto mb-2 ${
                status === 'ATTENDING' ? 'text-wedding-primary fill-wedding-primary' : 'text-wedding-nude'
              }`}
            />
            <span className="block font-medium">Joyfully Accept</span>
          </button>
          <button
            type="button"
            onClick={() => setStatus('NOT_ATTENDING')}
            className={`p-4 rounded-xl border-2 transition-all ${
              status === 'NOT_ATTENDING'
                ? 'border-wedding-nude bg-wedding-nude/10 text-wedding-navy'
                : 'border-wedding-nude/50 hover:border-wedding-nude'
            }`}
          >
            <HeartCrack
              className={`w-6 h-6 mx-auto mb-2 ${
                status === 'NOT_ATTENDING' ? 'text-gray-600' : 'text-wedding-nude'
              }`}
            />
            <span className="block font-medium">Regretfully Decline</span>
          </button>
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-wedding-navy mb-2">
          Message for the Couple <span className="text-gray-600 text-xs">(optional)</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          maxLength={1000}
          className="input-field resize-none"
          placeholder="Share your wishes..."
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error.message || 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending || !status || !name.trim() || !email.trim()}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit RSVP'
        )}
      </button>

      {!guestId && (
        <p className="text-xs text-gray-600 text-center">
          Your RSVP will be pending confirmation if you weren't specifically invited.
        </p>
      )}
    </motion.form>
  );
}
