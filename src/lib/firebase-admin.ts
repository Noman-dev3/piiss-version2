
import admin from 'firebase-admin';

// Check for the existence of Firebase credentials in environment variables
const hasFirebaseCreds = !!process.env.FIREBASE_PRIVATE_KEY_ID && !!process.env.FIREBASE_PRIVATE_KEY;

if (!hasFirebaseCreds) {
    console.warn("Firebase admin credentials are not set. Server-side Firebase features will be disabled.");
}

const serviceAccount = {
  "type": "service_account",
  "project_id": "piiss-website",
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-3y0g0@piiss-website.iam.gserviceaccount.com",
  "client_id": "115715895315582968374",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs/firebase-adminsdk-3y0g0@piiss-website.iam.gserviceaccount.com",
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

export const adminDb = hasFirebaseCreds ? admin.database() : null;
