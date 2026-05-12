import ScrollTrigger from '../components/ScrollTrigger';
import PhotoGallery from '../components/PhotoGallery';
import { galleryImages } from '../utils/galleryImages';

export default function GallerySection() {
  const photos = galleryImages.map((src, index) => ({
    src,
    alt: `Wedding photo ${index + 1}`,
  }));

  return (
    <section id="gallery" className="py-20 px-6 bg-wedding-cream">
      <div className="max-w-7xl mx-auto">
        <ScrollTrigger animation="fade-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-wedding-navy text-center mb-4">
            Our Gallery
          </h2>
          <p className="text-center text-gray-700 mb-16">
            A glimpse into our journey together
          </p>
        </ScrollTrigger>

        <ScrollTrigger animation="fade-up">
          <PhotoGallery photos={photos} initialBatchSize={12} loadMoreBatchSize={12} />
        </ScrollTrigger>
      </div>
    </section>
  );
}
