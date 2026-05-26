import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSlideshowProps {
  images: string[];
  logo: string;
  coupleNames: string;
}

// Placeholder gradient backgrounds for when images aren't loaded
const placeholderGradients = [
  'linear-gradient(135deg, #636B2F 0%, #BE5EA5 100%)',
  'linear-gradient(135deg, #BE5EA5 0%, #FFD3AC 100%)',
  'linear-gradient(135deg, #FFD3AC 0%, #E8BEAC 100%)',
  'linear-gradient(135deg, #E8BEAC 0%, #000080 100%)',
  'linear-gradient(135deg, #000080 0%, #636B2F 100%)',
];

export default function HeroSlideshow({ images, logo, coupleNames }: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(images.length).fill(false)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Auto-rotate every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  // Preload images
  useEffect(() => {
    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
      img.src = src;
    });
  }, [images]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slideshow Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: imagesLoaded[currentIndex]
              ? undefined
              : placeholderGradients[currentIndex % placeholderGradients.length],
          }}
        >
          {imagesLoaded[currentIndex] && (
            <img
              src={images[currentIndex]}
              alt={`Wedding photo ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-between py-12 md:py-16">
        {/* Logo at top center */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center"
        >
          <img
            src={logo}
            alt="Wedding Logo"
            className="h-24 md:h-32 w-auto object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Couple names centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white drop-shadow-2xl tracking-wide">
            {coupleNames}
          </h1>
        </motion.div>

        {/* Slide indicators at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex gap-2"
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
