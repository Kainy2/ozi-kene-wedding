import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Loader2 } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface PhotoGalleryProps {
  photos: Photo[];
  initialBatchSize?: number;
  loadMoreBatchSize?: number;
}

export default function PhotoGallery({
  photos,
  initialBatchSize = 12,
  loadMoreBatchSize = 12
}: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(initialBatchSize);
  const [isLoading, setIsLoading] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const loadMore = () => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount((prev) => Math.min(prev + loadMoreBatchSize, photos.length));
      setIsLoading(false);
    }, 300);
  };

  const displayedPhotos = photos.slice(0, displayedCount);
  const hasMore = displayedCount < photos.length;

  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No photos available yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {displayedPhotos.map((photo, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (index % loadMoreBatchSize) * 0.03 }}
            onClick={() => openLightbox(index)}
            className="aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.button>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-8 py-3 bg-wedding-primary text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Loading...
              </>
            ) : (
              `Load More (${photos.length - displayedCount} remaining)`
            )}
          </button>
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={photos.map((p) => ({ src: p.src, alt: p.alt }))}
        styles={{
          container: { backgroundColor: 'rgba(0, 31, 63, 0.95)' }, // Navy blue overlay
        }}
      />
    </>
  );
}
