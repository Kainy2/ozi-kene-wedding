import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FaqAccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export default function FaqAccordion({ question, answer, defaultOpen = false }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-wedding-nude">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 px-4 md:px-6 flex justify-between items-center text-left hover:bg-wedding-cream transition-colors"
      >
        <h3 className="text-lg md:text-xl font-serif font-semibold text-wedding-navy pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0 text-wedding-primary">
          {isOpen ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-5 text-gray-700 leading-relaxed whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
