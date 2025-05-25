import {
  getApps,
  initializeApp,
  cert,
  App,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK
export function initFirebaseAdmin(): App {
  const apps = getApps();

  if (apps.length > 0) {
    return apps[0];
  }

  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")!,
  };

  return initializeApp({
    credential: cert(serviceAccount),
  });
}

// Helper function to get the Auth instance
export function getAdminAuth() {
  return getAuth(initFirebaseAdmin());
}

// Export the initialized app
export const app = initFirebaseAdmin();
