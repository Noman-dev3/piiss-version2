
import admin from 'firebase-admin';

// Check for the existence of Firebase credentials in environment variables
const hasFirebaseCreds = !!process.env.FIREBASE_PROJECT_ID && !!process.env.FIREBASE_PRIVATE_KEY_ID && !!process.env.FIREBASE_PRIVATE_KEY && !!process.env.FIREBASE_CLIENT_EMAIL;

if (!hasFirebaseCreds) {
    console.warn("Firebase admin credentials are not fully set in environment variables. Server-side Firebase features will be disabled. Make sure all required FIREBASE_* variables are present.");
}

const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": `https://www.googleapis.com/oauth2/v1/certs/${process.env.FIREBASE_CLIENT_EMAIL?.replace('@', '%40')}`,
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length && hasFirebaseCreds) {
  try {
    admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://piiss-website-default-rtdb.firebaseio.com"
    });
  } catch (error) {
     console.error("Firebase admin initialization error:", error);
  }
}

export const adminDb = hasFirebaseCreds && admin.apps.length > 0 ? admin.database() : null;
