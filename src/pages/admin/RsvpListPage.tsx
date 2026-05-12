import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, RefreshCw, Check, X, Clock } from 'lucide-react';
import * as firebaseService from '../../services/firebaseService';

type FilterStatus = 'approved-attending' | 'all' | 'attending' | 'not-attending' | 'pending' | 'no-response';

export default function RsvpListPage() {
  const [guests, setGuests] = useState<firebaseService.Guest[]>([]);
  const [rsvps, setRsvps] = useState<firebaseService.Rsvp[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('approved-attending');
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.actions-dropdown')) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [guestsData, rsvpsData] = await Promise.all([
        firebaseService.getAllGuests(),
        firebaseService.getAllRsvps(),
      ]);
      setGuests(guestsData);
      setRsvps(rsvpsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (guestId: string) => {
    if (!confirm('Are you sure you want to delete this guest?')) return;

    try {
      await firebaseService.deleteGuest(guestId);
      await loadData();
    } catch (error) {
      console.error('Failed to delete guest:', error);
      alert('Failed to delete guest');
    }
  };

  const handleRegenerateToken = async (guestId: string) => {
    if (!confirm('Are you sure you want to regenerate the invitation token?')) return;

    try {
      const newToken = await firebaseService.regenerateToken(guestId);
      alert(`New token: ${newToken}`);
      await loadData();
    } catch (error) {
      console.error('Failed to regenerate token:', error);
      alert('Failed to regenerate token');
    }
  };

  const handleApprove = async (guestId: string) => {
    try {
      // Update guest status
      await firebaseService.updateGuest(guestId, { status: 'APPROVED' });

      // Get guest data and check if they have RSVP
      const guest = await firebaseService.getGuestById(guestId);
      const rsvp = await firebaseService.getRsvpByGuestId(guestId);

      // Send email only if guest is ATTENDING and has email
      if (guest && guest.email && rsvp?.status === 'ATTENDING') {
        const config = {
          title: import.meta.env.VITE_WEDDING_TITLE || "The Forever Affair '26: Elma & Kainy",
          date: import.meta.env.VITE_WEDDING_DATE || '2026-04-04 00:00',
          venueAddress: import.meta.env.VITE_VENUE_ADDRESS || 'Astro Halls, Port Harcourt, Nigeria',
          venueMapLink: import.meta.env.VITE_VENUE_MAP_LINK || 'https://maps.google.com/?q=Astro+Halls+Port+Harcourt',
        };

        const emailSent = await firebaseService.sendApprovalEmail(guest, config);

        if (emailSent) {
          alert(`Guest approved and email sent to ${guest.email}`);
        } else {
          alert('Guest approved but failed to send email. Please check email configuration.');
        }
      } else {
        alert('Guest approved successfully.');
      }

      await loadData();
    } catch (error) {
      console.error('Failed to approve guest:', error);
      alert('Failed to approve guest');
    }
  };

  const handleDeny = async (guestId: string) => {
    if (!confirm('Are you sure you want to deny this guest?')) return;

    try {
      await firebaseService.updateGuest(guestId, { status: 'DENIED' });
      await loadData();
    } catch (error) {
      console.error('Failed to deny guest:', error);
    }
  };

  const handleAction = async (action: () => Promise<void>) => {
    setOpenDropdownId(null); // Close dropdown immediately
    await action();
  };

  const getRsvpForGuest = (guestId: string) => {
    return rsvps.find(r => r.guestId === guestId);
  };

  const MobileActionsDropdown = ({ guest }: { guest: firebaseService.Guest }) => {
    const isOpen = openDropdownId === guest.id;

    return (
      <div className="relative actions-dropdown">
        <button
          onClick={() => setOpenDropdownId(isOpen ? null : guest.id)}
          className="px-3 py-1.5 text-sm border border-wedding-blush rounded-md hover:bg-wedding-cream text-wedding-brown"
        >
          Actions
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-wedding-blush z-10">
            <div className="py-1">
              {guest.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => handleAction(() => handleApprove(guest.id))}
                    className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-wedding-cream flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(() => handleDeny(guest.id))}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-wedding-cream flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Deny
                  </button>
                </>
              )}
              <button
                onClick={() => handleAction(() => handleRegenerateToken(guest.id))}
                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-wedding-cream flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate Token
              </button>
              <button
                onClick={() => handleAction(() => handleDelete(guest.id))}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-wedding-cream flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const filteredGuests = guests.filter(guest => {
    // Search filter
    const matchesSearch =
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Status filter
    const rsvp = getRsvpForGuest(guest.id);

    if (filterStatus === 'approved-attending') {
      return guest.status === 'APPROVED' && rsvp?.status === 'ATTENDING';
    }
    if (filterStatus === 'all') return true;
    if (filterStatus === 'attending') return rsvp?.status === 'ATTENDING';
    if (filterStatus === 'not-attending') return rsvp?.status === 'NOT_ATTENDING';
    if (filterStatus === 'pending') return guest.status === 'PENDING';
    if (filterStatus === 'no-response') return !rsvp;

    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-wedding-taupe">Loading guests...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-wedding-brown mb-2">RSVP List</h1>
        <p className="text-wedding-taupe">Manage wedding guest responses</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-wedding-muted w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-wedding-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-sage"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="px-4 py-2 border border-wedding-blush rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-sage"
        >
          <option value="approved-attending">Approved & Attending</option>
          <option value="all">All Guests</option>
          <option value="attending">Attending</option>
          <option value="not-attending">Not Attending</option>
          <option value="pending">Pending Approval</option>
          <option value="no-response">No Response</option>
        </select>
      </div>

      {/* Guest Table */}
      <div className="bg-white rounded-lg shadow-sm border border-wedding-blush overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-wedding-cream border-b border-wedding-blush">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-wedding-brown uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wedding-brown uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wedding-brown uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wedding-brown uppercase tracking-wider">
                  RSVP Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wedding-brown uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-wedding-brown uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-wedding-blush">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-wedding-taupe">
                    No guests found
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest, index) => {
                  const rsvp = getRsvpForGuest(guest.id);
                  return (
                    <motion.tr
                      key={guest.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-wedding-cream/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-wedding-brown">
                          {guest.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-wedding-taupe">{guest.email || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-wedding-taupe">{guest.phone || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {rsvp ? (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rsvp.status === 'ATTENDING'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {rsvp.status === 'ATTENDING' ? 'Attending' : 'Not Attending'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            No Response
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-wedding-taupe">{guest.invitationType}</span>
                          {guest.status === 'PENDING' && (
                            <Clock className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {/* Desktop: Icon buttons (hidden on mobile) */}
                        <div className="hidden md:flex items-center gap-2">
                          {guest.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApprove(guest.id)}
                                className="text-green-600 hover:text-green-800"
                                title="Approve"
                                aria-label="Approve guest"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeny(guest.id)}
                                className="text-red-600 hover:text-red-800"
                                title="Deny"
                                aria-label="Deny guest"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleRegenerateToken(guest.id)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Regenerate Token"
                            aria-label="Regenerate invitation token"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(guest.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                            aria-label="Delete guest"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Mobile: Dropdown (shown only on mobile) */}
                        <div className="md:hidden">
                          <MobileActionsDropdown guest={guest} />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-wedding-taupe">
        Showing {filteredGuests.length} of {guests.length} guests
      </div>
    </div>
  );
}
