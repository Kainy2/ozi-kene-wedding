import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as firebaseService from '../services/firebaseService';
import { sendRsvpConfirmation } from '../lib/brevo';
import { useConfig } from './useConfig';

export function useGuest(guestId?: string) {
  return useQuery({
    queryKey: ['guest', guestId],
    queryFn: async () => {
      if (!guestId) return null;

      if (firebaseService.isValidTokenFormat(guestId)) {
        const guest = await firebaseService.getGuestByToken(guestId);

        if (!guest) {
          // Check if it's a pending/blank token
          const isPending = await firebaseService.isPendingToken(guestId);
          if (isPending) {
            return { isPendingToken: true, token: guestId };
          }
          throw new Error('Guest not found');
        }

        // Get RSVP
        const rsvp = await firebaseService.getRsvpByGuestId(guest.id);
        return { ...guest, rsvp };
      } else {
        const guest = await firebaseService.getGuestById(guestId);
        if (!guest) throw new Error('Guest not found');

        const rsvp = await firebaseService.getRsvpByGuestId(guest.id);
        return { ...guest, rsvp };
      }
    },
    enabled: !!guestId,
    retry: false,
  });
}

export function useSubmitRsvp() {
  const queryClient = useQueryClient();
  const config = useConfig();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone?: string;
      status: 'ATTENDING' | 'NOT_ATTENDING';
      message?: string;
      guestId?: string;
    }) => {
      const { name, email, phone, status, message, guestId } = data;

      // Token-based flow
      if (guestId && firebaseService.isValidTokenFormat(guestId)) {
        // Check if this is a blank/pending token
        const isPending = await firebaseService.isPendingToken(guestId);

        if (isPending) {
          // BLANK TOKEN FLOW: Create new guest from scratch

          // Check for duplicate email
          const existingGuest = await firebaseService.getGuestByEmail(email);
          if (existingGuest) {
            throw new Error('This email address is already registered. Please contact the hosts if you need assistance.');
          }

          // Create new guest with APPROVED status
          const newGuest = await firebaseService.createGuest({
            name,
            email,
            phone,
            status: 'APPROVED',
          });

          // Replace the auto-generated token with the pending token
          await firebaseService.updateGuest(newGuest.id, {
            inviteToken: guestId,
            tokenUsed: true,
          });

          // Update token lookup
          const { ref, set } = await import('firebase/database');
          const { database } = await import('../lib/firebase');
          await set(ref(database, `tokens/${guestId}`), newGuest.id);

          // Consume the pending token
          await firebaseService.consumePendingToken(guestId);

          // Create RSVP
          const rsvp = await firebaseService.createRsvp({
            guestId: newGuest.id,
            status,
            message,
          });

          // Send email if attending
          if (status === 'ATTENDING' && email) {
            try {
              await sendRsvpConfirmation({
                to: email,
                guestName: name,
                weddingTitle: `${config.couple.bride} & ${config.couple.groom}`,
                weddingDate: config.events.day1.date,
                venueAddress: config.events.day1.church.address,
                venueMapLink: config.events.day1.church.mapLink,
                inviteImageUrl: import.meta.env.VITE_INVITE_IMAGE_URL,
                inviteToken: guestId,
                inviteBaseUrl: window.location.origin,
              });

              await firebaseService.updateGuest(newGuest.id, { emailSent: true });
            } catch (error) {
              console.error('Failed to send email:', error);
            }
          }

          return { guest: newGuest, rsvp };
        }

        // EXISTING LOGIC: Regular token with pre-filled guest
        const guest = await firebaseService.getGuestByToken(guestId);
        if (!guest) throw new Error('Invalid invitation token');

        // Check if already used
        const existingRsvp = await firebaseService.getRsvpByGuestId(guest.id);
        if (existingRsvp || guest.tokenUsed) {
          return { alreadyRegistered: true, guest, rsvp: existingRsvp };
        }

        // Check if email is already taken by another guest
        const existingGuestWithEmail = await firebaseService.getGuestByEmail(email);
        if (existingGuestWithEmail && existingGuestWithEmail.id !== guest.id) {
          throw new Error('This email address is already registered. Please use a different email or contact the hosts for assistance.');
        }

        // Update guest info
        await firebaseService.updateGuest(guest.id, {
          name,
          email: email.toLowerCase(),
          phone,
          tokenUsed: true,
        });

        // Create RSVP
        const rsvp = await firebaseService.createRsvp({
          guestId: guest.id,
          status,
          message,
        });

        // Send email if attending
        if (status === 'ATTENDING' && email) {
          try {
            await sendRsvpConfirmation({
              to: email,
              guestName: name,
              weddingTitle: `${config.couple.bride} & ${config.couple.groom}`,
              weddingDate: config.events.day1.date,
              venueAddress: config.events.day1.church.address,
              venueMapLink: config.events.day1.church.mapLink,
              inviteImageUrl: import.meta.env.VITE_INVITE_IMAGE_URL,
              inviteToken: guest.inviteToken,
              inviteBaseUrl: window.location.origin,
            });

            await firebaseService.updateGuest(guest.id, { emailSent: true });
          } catch (error) {
            console.error('Failed to send email:', error);
          }
        }

        return { guest: { ...guest, name, email, phone }, rsvp };
      }

      // Self-registration flow
      if (status === 'NOT_ATTENDING') {
        throw new Error('Self-registration only supports accepting invitations');
      }

      // Check if email already exists
      const existingGuest = await firebaseService.getGuestByEmail(email);
      if (existingGuest) {
        throw new Error('This email address is already registered. Please contact the hosts if you need assistance.');
      }

      const newGuest = await firebaseService.createGuest({ name, email, phone, status: 'PENDING' });
      await firebaseService.updateGuest(newGuest.id, {
        invitationType: 'SELF',
        status: 'PENDING',
      });

      const rsvp = await firebaseService.createRsvp({
        guestId: newGuest.id,
        status,
        message,
      });

      return { guest: newGuest, rsvp };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guest'] });
    },
  });
}

