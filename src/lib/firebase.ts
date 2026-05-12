import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig: FirebaseOptions = JSON.parse(
  import.meta.env.VITE_FIREBASE_CONFIG || "{}"
)

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
