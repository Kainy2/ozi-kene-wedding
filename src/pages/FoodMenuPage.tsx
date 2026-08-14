import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useConfig } from '../hooks/useConfig';

export default function FoodMenuPage() {
  const config = useConfig();
  const sections = config.foodMenu?.sections ?? [];

  return (
    <div className="min-h-screen bg-wedding-primary">
      {/* Back Button */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-white/30 transition-all"
        aria-label="Back to home"
      >
        <ArrowLeft size={24} />
      </Link>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Panel — Decorative "MENU" */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-2/5 flex flex-col items-center justify-center py-16 px-8 lg:py-0 lg:sticky lg:top-0 lg:h-screen"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Large decorative MENU text */}
            <h1
              className="font-serif text-white/90 tracking-[0.3em] leading-[1.1]"
              style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', fontWeight: 300 }}
            >
              <span className="block">M</span>
              <span className="block">E</span>
              <span className="block">N</span>
              <span className="block">U</span>
            </h1>

            {/* Date */}
            <p className="text-white/80 font-serif text-xl tracking-[0.2em]">
              12 . 09 . 26
            </p>

            {/* Logo */}
            <img
              src={config.assets.logoWhite}
              alt={config.couple.displayName}
              className="w-16 h-16 object-contain opacity-80"
            />

            {/* Hashtag */}
            <p className="text-white/70 font-sans text-sm tracking-[0.15em]">
              #{config.couple.hashTag.replace(/['\s]/g, '')}
            </p>
          </div>
        </motion.div>

        {/* Right Panel — Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-3/5 flex flex-col justify-center py-16 px-8 lg:px-16 lg:py-20"
        >
          <div className="max-w-lg mx-auto lg:mx-0 space-y-12">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + sectionIndex * 0.15 }}
                className="text-center lg:text-right"
              >
                {/* Section Title */}
                <h2 className="font-serif text-white text-lg tracking-[0.2em] uppercase font-semibold mb-3">
                  {section.title}
                </h2>

                {/* Menu Items */}
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-white/85 font-sans text-sm tracking-wide"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
