import { motion } from 'framer-motion';
import { useConfig } from '../hooks/useConfig';

export default function ClosingSection() {
  const config = useConfig();

  return (
    <section
      id="closing"
      className="py-32 px-6 bg-cover bg-center bg-fixed relative min-h-[60vh] flex items-center justify-center"
      style={{ backgroundImage: `url(${config.assets.closingSectionBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-2xl">
            {config.content.closingMessage}
          </h2>
          <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
            {config.couple.displayName}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
