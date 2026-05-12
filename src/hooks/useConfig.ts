import { weddingConfig } from '../config/wedding.config';
import type { WeddingConfig } from '../config/wedding.config';

export function useConfig(): WeddingConfig {
  return weddingConfig;
}
