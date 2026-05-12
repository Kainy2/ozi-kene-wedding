import { database } from '../lib/firebase';
import { ref, set, get, push, update, query, orderByChild, equalTo } from 'firebase/database';
import { generateInviteToken, isValidTokenFormat } from '../utils/tokenUtils';

// Helper to remove undefined values (Firebase doesn't accept undefined)
function sanitizeForFirebase<T extends Record<string, any>>(obj: T): Partial<T> {
  const sanitized: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inviteToken: string;
  tokenUsed: boolean;
  invitationType: 'DIRECT' | 'SELF';
  status: 'PENDING' | 'APPROVED' | 'DENIED';
  emailSent: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Rsvp {
  id: string;
  guestId: string;
  status: 'ATTENDING' | 'NOT_ATTENDING';
  message?: string;
  createdAt: number;
}

// Guest Operations
export async function createGuest(data: {
  name: string;
  email: string;
  phone?: string;
  status: string
}): Promise<Guest> {
  const guestsRef = ref(database, 'guests');
  const newGuestRef = push(guestsRef);
  const guestId = newGuestRef.key!;

  const token = generateInviteToken();
  const now = Date.now();

  const guest: Guest = {
    id: guestId,
    name: data.name,
    email: data.email || '',
    phone: data.phone,
    inviteToken: token,
    tokenUsed: false,
    invitationType: 'DIRECT',
    status: 'APPROVED',
    emailSent: false,
    createdAt: now,
    updatedAt: now,
  };

  await set(newGuestRef, sanitizeForFirebase(guest));

  // Create token lookup
  await set(ref(database, `tokens/${token}`), guestId);

  return guest;
}

export async function getGuestByToken(token: string): Promise<Guest | null> {
  // Get guest ID from token lookup
  const tokenRef = ref(database, `tokens/${token}`);
  const tokenSnap = await get(tokenRef);

  if (!tokenSnap.exists()) {
    return null;
  }

  const guestId = tokenSnap.val();
  const guestRef = ref(database, `guests/${guestId}`);
  const guestSnap = await get(guestRef);

  return guestSnap.exists() ? guestSnap.val() : null;
}

export async function getGuestById(guestId: string): Promise<Guest | null> {
  const guestRef = ref(database, `guests/${guestId}`);
  const snap = await get(guestRef);
  return snap.exists() ? snap.val() : null;
}

export async function getAllGuests(): Promise<Guest[]> {
  const guestsRef = ref(database, 'guests');
  const snap = await get(guestsRef);

  if (!snap.exists()) {
    return [];
  }

  return Object.values(snap.val());
}

export async function getGuestByEmail(email: string): Promise<Guest | null> {
  const guestsRef = ref(database, 'guests');
  const emailQuery = query(guestsRef, orderByChild('email'), equalTo(email.toLowerCase()));
  const snap = await get(emailQuery);

  if (!snap.exists()) {
    return null;
  }

  const guests = Object.values(snap.val()) as Guest[];
  return guests[0] || null;
}

export async function updateGuest(guestId: string, updates: Partial<Guest>): Promise<void> {
  const guestRef = ref(database, `guests/${guestId}`);
  await update(guestRef, sanitizeForFirebase({ ...updates, updatedAt: Date.now() }));
}

export async function deleteGuest(guestId: string): Promise<void> {
  const guest = await getGuestById(guestId);
  if (!guest) return;

  // Delete guest
  await set(ref(database, `guests/${guestId}`), null);

  // Delete token lookup
  await set(ref(database, `tokens/${guest.inviteToken}`), null);

  // Delete associated RSVP
  const rsvp = await getRsvpByGuestId(guestId);
  if (rsvp) {
    await set(ref(database, `rsvps/${rsvp.id}`), null);
  }
}

export async function regenerateToken(guestId: string): Promise<string> {
  const guest = await getGuestById(guestId);
  if (!guest) throw new Error('Guest not found');

  // Delete old token lookup
  await set(ref(database, `tokens/${guest.inviteToken}`), null);

  // Generate new token
  const newToken = generateInviteToken();

  // Update guest
  await updateGuest(guestId, {
    inviteToken: newToken,
    tokenUsed: false,
  });

  // Create new token lookup
  await set(ref(database, `tokens/${newToken}`), guestId);

  return newToken;
}

// Helper function to send email after admin approves a guest
export async function sendApprovalEmail(guest: Guest, config: {
  title: string;
  date: string;
  venueAddress: string;
  venueMapLink: string;
}) {
  const { sendRsvpConfirmation } = await import('../lib/brevo');

  try {
    await sendRsvpConfirmation({
      to: guest.email,
      guestName: guest.name,
      weddingTitle: config.title,
      weddingDate: config.date,
      venueAddress: config.venueAddress,
      venueMapLink: config.venueMapLink,
      inviteImageUrl: import.meta.env.VITE_INVITE_IMAGE_URL,
    });

    // Mark email as sent
    await updateGuest(guest.id, { emailSent: true });
    return true;
  } catch (error) {
    console.error('Failed to send approval email:', error);
    return false;
  }
}

// Pending Token Operations (for blank invite links)
export async function generateBlankInviteToken(): Promise<string> {
  const token = generateInviteToken();
  const now = Date.now();

  const pendingTokenRef = ref(database, `pendingTokens/${token}`);
  await set(pendingTokenRef, {
    token,
    createdAt: now,
  });

  return token;
}

export async function isPendingToken(token: string): Promise<boolean> {
  const pendingTokenRef = ref(database, `pendingTokens/${token}`);
  const snap = await get(pendingTokenRef);
  return snap.exists();
}

export async function consumePendingToken(token: string): Promise<void> {
  const pendingTokenRef = ref(database, `pendingTokens/${token}`);
  await set(pendingTokenRef, null); // Delete the pending token
}

// RSVP Operations
export async function createRsvp(data: {
  guestId: string;
  status: 'ATTENDING' | 'NOT_ATTENDING';
  message?: string;
}): Promise<Rsvp> {
  const rsvpsRef = ref(database, 'rsvps');
  const newRsvpRef = push(rsvpsRef);

  const rsvp: Rsvp = {
    id: newRsvpRef.key!,
    guestId: data.guestId,
    status: data.status,
    message: data.message,
    createdAt: Date.now(),
  };

  await set(newRsvpRef, sanitizeForFirebase(rsvp));
  return rsvp;
}

export async function getRsvpByGuestId(guestId: string): Promise<Rsvp | null> {
  
  const rsvpsRef = ref(database, 'rsvps');
  const rsvpQuery = query(rsvpsRef, orderByChild('guestId'), equalTo(guestId));
  const snap = await get(rsvpQuery);


  if (!snap.exists()) {
    return null;
  }

  const rsvps = Object.values(snap.val()) as Rsvp[];
  return rsvps[0] || null;
}

export async function getAllRsvps(): Promise<Rsvp[]> {
  const rsvpsRef = ref(database, 'rsvps');
  const snap = await get(rsvpsRef);

  if (!snap.exists()) {
    return [];
  }

  return Object.values(snap.val());
}

// Stats
export async function getGuestStats() {
  const guests = await getAllGuests();
  const rsvps = await getAllRsvps();

  const rsvpMap = new Map(rsvps.map(r => [r.guestId, r]));

  const attending = guests.filter(g => {
    const rsvp = rsvpMap.get(g.id);
    return rsvp?.status === 'ATTENDING';
  }).length;

  const notAttending = guests.filter(g => {
    const rsvp = rsvpMap.get(g.id);
    return rsvp?.status === 'NOT_ATTENDING';
  }).length;

  const pending = guests.filter(g => g.status === 'PENDING').length;

  const noResponse = guests.filter(g => !rsvpMap.has(g.id)).length;

  return {
    totalGuests: guests.length,
    attending,
    notAttending,
    pending,
    noResponse,
  };
}

// Export isValidTokenFormat for use in other files
export { isValidTokenFormat };
