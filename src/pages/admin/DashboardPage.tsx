import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import * as firebaseService from '../../services/firebaseService';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalGuests: 0,
    attending: 0,
    notAttending: 0,
    pending: 0,
    noResponse: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const data = await firebaseService.getGuestStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Guests',
      value: stats.totalGuests,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'Attending',
      value: stats.attending,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      label: 'Not Attending',
      value: stats.notAttending,
      icon: UserX,
      color: 'bg-red-500',
    },
    {
      label: 'Pending Approval',
      value: stats.pending,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-wedding-taupe">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-wedding-brown mb-2">Dashboard</h1>
        <p className="text-wedding-taupe">Wedding RSVP overview and statistics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 border border-wedding-blush"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-wedding-brown mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-wedding-taupe">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-wedding-blush"
      >
        <h2 className="text-xl font-serif text-wedding-brown mb-4">
          RSVP Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-wedding-taupe">Response Rate</span>
            <span className="font-medium text-wedding-brown">
              {stats.totalGuests > 0
                ? Math.round(
                    ((stats.attending + stats.notAttending) /
                      stats.totalGuests) *
                      100
                  )
                : 0}
              %
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-wedding-taupe">No Response</span>
            <span className="font-medium text-wedding-brown">
              {stats.noResponse}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
