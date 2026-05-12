// Generate array of all proposal images (ACP_3101.jpg to ACP_3205.jpg, skipping ACP_3182.jpg which doesn't exist)
export const galleryImages: string[] = [];

for (let i = 3101; i <= 3205; i++) {
  // Skip 3182 as it doesn't exist in the directory
  if (i !== 3182) {
    galleryImages.push(`/images/proposal-images/ACP_${i}.jpg`);
  }
}

// Total: 104 images
export const GALLERY_BATCH_SIZE = 12;
