/**
 * Generates an ICS (iCalendar) file content for a wedding event
 */
export function generateWeddingICS(params: {
  title: string;
  date: string; // Format: "2026-04-04 15:00"
  address: string;
}): string {
  const eventDate = new Date(params.date);

  // Format: YYYYMMDD for all-day events
  const dateStr = eventDate.toISOString().split('T')[0].replace(/-/g, '');

  // Calculate next day for all-day event end
  const endDate = new Date(eventDate);
  endDate.setDate(endDate.getDate() + 1);
  const endDateStr = endDate.toISOString().split('T')[0].replace(/-/g, '');

  // Generate unique ID
  const uid = `wedding-${dateStr}-${Math.random().toString(36).substring(7)}@wedding.app`;

  // Current timestamp for DTSTAMP
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Build ICS content
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding RSVP App//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${endDateStr}`,
    `SUMMARY:${escapeICSValue(params.title)}`,
    `LOCATION:${escapeICSValue(params.address)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D', // Reminder 1 day before
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${escapeICSValue(params.title)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return ics;
}

/**
 * Escape special characters in ICS values
 */
function escapeICSValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Convert ICS content to base64 for email attachment
 */
export function icsToBase64(icsContent: string): string {
  // In browser, use btoa after encoding to UTF-8
  const utf8Bytes = new TextEncoder().encode(icsContent);
  const binaryString = String.fromCharCode(...utf8Bytes);
  return btoa(binaryString);
}
