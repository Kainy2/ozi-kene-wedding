import { ExternalLink } from 'lucide-react';

interface MapEmbedProps {
  embedUrl: string;
  mapLink: string;
  address: string;
}

export default function MapEmbed({ embedUrl, mapLink, address }: MapEmbedProps) {
  return (
    <div className="space-y-4">
      {/* Embedded Map */}
      <div className="rounded-xl overflow-hidden shadow-md border border-wedding-blush">
        <iframe
          src={embedUrl}
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding Venue Location"
          className="w-full"
        />
      </div>

      {/* Address and Open in Maps Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white rounded-xl border border-wedding-blush">
        <div>
          <p className="text-wedding-brown font-medium">{address}</p>
        </div>
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <ExternalLink size={18} />
          Open in Maps
        </a>
      </div>
    </div>
  );
}

