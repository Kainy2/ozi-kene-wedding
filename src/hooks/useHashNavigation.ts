import { useEffect } from 'react';

export function useHashNavigation() {
  // Scroll to hash on initial page load/refresh
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const navigateToSection = (sectionId: string) => {
    // Update the hash in the URL
    window.location.hash = sectionId;

    // Get the element and scroll to it
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getCurrentSection = (): string => {
    return window.location.hash.replace('#', '') || 'hero';
  };

  return {
    navigateToSection,
    getCurrentSection
  };
}
