export function useHashNavigation() {
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
