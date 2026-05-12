import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, UserPlus, Link } from 'lucide-react';
import * as firebaseService from '../../services/firebaseService';

export default function CreateInvitePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Blank invite link state
  const [blankInviteLink, setBlankInviteLink] = useState('');
  const [blankCopied, setBlankCopied] = useState(false);
  const [isGeneratingBlank, setIsGeneratingBlank] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInviteLink('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setIsLoading(true);
      const guest = await firebaseService.createGuest({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        status: "ATTENDING"
      });

      const link = `${window.location.origin}/rsvp/${guest.inviteToken}`;
      setInviteLink(link);

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      console.error('Failed to create guest:', err);
      setError('Failed to create invitation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleGenerateBlankInvite = async () => {
    try {
      setIsGeneratingBlank(true);
      setBlankInviteLink('');
      setError('');

      const token = await firebaseService.generateBlankInviteToken();
      const link = `${window.location.origin}/rsvp/${token}`;
      setBlankInviteLink(link);
    } catch (err) {
      console.error('Failed to generate blank invite:', err);
      setError('Failed to generate invite link. Please try again.');
    } finally {
      setIsGeneratingBlank(false);
    }
  };

  const copyBlankToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(blankInviteLink);
      setBlankCopied(true);
      setTimeout(() => setBlankCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-wedding-brown mb-2">Create Invitation</h1>
        <p className="text-wedding-taupe">Add a guest with details or generate a blank invite link</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* LEFT: Add Guest Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-wedding-blush"
        >
          <h2 className="text-xl font-serif text-wedding-brown mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add Guest
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-wedding-brown mb-2">
                Guest Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-wedding-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-sage"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-wedding-brown mb-2">
                Email Address <span className="text-wedding-muted text-xs">(optional)</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-wedding-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-sage"
                placeholder="john@example.com"
              />
              <p className="text-xs text-wedding-taupe mt-1">
                Guest can provide email during RSVP if not specified
              </p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-wedding-brown mb-2">
                Phone Number <span className="text-wedding-muted text-xs">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border border-wedding-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-sage"
                placeholder="+1234567890"
              />
              <p className="text-xs text-wedding-taupe mt-1">
                Include country code for international numbers
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <UserPlus className="w-5 h-5" />
              {isLoading ? 'Adding...' : 'Add Guest'}
            </button>
          </form>
        </motion.div>

        {/* RIGHT: Invite Links */}
        <div className="space-y-6">
          {/* Generate Blank Link Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-wedding-blush"
          >
            <h2 className="text-xl font-serif text-wedding-brown mb-6 flex items-center gap-2">
              <Link className="w-5 h-5" />
              Generate Blank Invite Link
            </h2>

            <div className="space-y-4">
              <p className="text-sm text-wedding-taupe">
                Generate a blank invitation link that guests can use to RSVP.
                They will fill in their own details when they visit the link.
              </p>

              <button
                onClick={handleGenerateBlankInvite}
                disabled={isGeneratingBlank}
                className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Link className="w-5 h-5" />
                {isGeneratingBlank ? 'Generating...' : 'Generate Blank Link'}
              </button>

              {blankInviteLink && (
                <div className="space-y-3">
                  <div className="p-4 bg-wedding-cream rounded-lg">
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm text-wedding-brown break-all bg-white px-3 py-2 rounded border border-wedding-blush">
                        {blankInviteLink}
                      </code>
                      <button
                        onClick={copyBlankToClipboard}
                        className="p-2 hover:bg-wedding-sage/10 rounded-lg transition-colors flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        {blankCopied ? (
                          <Check className="w-5 h-5 text-wedding-sage" />
                        ) : (
                          <Copy className="w-5 h-5 text-wedding-taupe" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    ✓ Blank invite link generated! Share this with your guest.
                  </div>

                  <div className="text-sm text-wedding-taupe space-y-1">
                    <p>• Guest will enter their own name, email, and phone</p>
                    <p>• Link can only be used once</p>
                    <p>• Guest is automatically approved after submitting</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Generated Guest Link Section */}
          {inviteLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 border border-wedding-blush"
            >
              <h2 className="text-xl font-serif text-wedding-brown mb-4">Guest Added Successfully</h2>

              <div className="space-y-3">
                <div className="p-4 bg-wedding-cream rounded-lg">
                  <p className="text-sm text-wedding-taupe mb-2">Share this link with {name}:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-wedding-brown break-all bg-white px-3 py-2 rounded border border-wedding-blush">
                      {inviteLink}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-wedding-sage/10 rounded-lg transition-colors flex-shrink-0"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-wedding-sage" />
                      ) : (
                        <Copy className="w-5 h-5 text-wedding-taupe" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                  ✓ Guest added with pre-filled details. They can review and update when RSVPing.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
