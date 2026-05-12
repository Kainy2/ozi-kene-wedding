import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useHashNavigation } from '../hooks/useHashNavigation';

interface MenuItem {
  id: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'welcome', label: 'Welcome' },
  { id: 'details', label: 'Wedding Details' },
  { id: 'map', label: 'Directions' },
  { id: 'colors', label: 'Color Palette' },
  { id: 'story', label: 'Our Story' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'faq', label: 'FAQ' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateToSection, getCurrentSection } = useHashNavigation();
  const currentSection = getCurrentSection();

  const handleMenuClick = (sectionId: string) => {
    navigateToSection(sectionId);
    setIsOpen(false); // Auto-close menu
  };

  const menuVariants = {
    closed: { x: '100%', transition: { duration: 0.3 } },
    open: { x: 0, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    closed: { opacity: 0, pointerEvents: 'none' as const },
    open: { opacity: 1, pointerEvents: 'auto' as const },
  };

  return (
    <>
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 bg-wedding-primary text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-50"
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-wedding-cream shadow-2xl z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsOpen(false)}
                className="text-wedding-primary hover:text-wedding-secondary transition-colors"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="px-8 pb-8">
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full text-left text-lg font-serif py-3 px-4 rounded-lg transition-colors ${
                        currentSection === item.id
                          ? 'bg-wedding-primary text-white'
                          : 'text-wedding-navy hover:bg-wedding-nude'
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
