/**
 * FOCUS (فوكس) - Firebase Config & Services Integration
 * Project ID: focus-e933d
 */

// Official Firebase Configuration for Project focus-e933d
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAPz6JkOeyHffuYkNbvjV7qc2J87y-QlJ4",
  authDomain: "focus-e933d.firebaseapp.com",
  projectId: "focus-e933d",
  storageBucket: "focus-e933d.firebasestorage.app",
  messagingSenderId: "511933055653",
  appId: "1:511933055653:web:a3fd309889199f6688c34c",
  measurementId: "G-P2M48PGB6P"
};

window.FocusFirebase = {
  db: null,
  auth: null,
  analytics: null,
  currentUser: null,
  isInitialized: false,
  listeners: [],

  /**
   * Initialize Firebase SDK & Services
   */
  async init() {
    try {
      const storedConfig = JSON.parse(localStorage.getItem('focus_firebase_config_custom') || 'null');
      const config = storedConfig || DEFAULT_FIREBASE_CONFIG;

      // Check if minimum required config exists
      if (!config.apiKey) {
        console.warn("⚠️ Firebase API Key is not set yet. App is running with local fallback dataset (SUKOON_DATA). You can set your Firebase keys in app settings or firebase-config.js.");
        return false;
      }

      if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        this.db = firebase.firestore();
        this.auth = firebase.auth();

        if (firebase.analytics && config.measurementId) {
          try {
            this.analytics = firebase.analytics();
          } catch (e) {
            console.warn("Analytics notice:", e.message);
          }
        }

        this.isInitialized = true;

        // Auto sign-in anonymously for persistent state
        this.auth.onAuthStateChanged((user) => {
          if (user) {
            this.currentUser = user;
            console.log("✅ Firebase Auth: Signed in as", user.uid);
            if (window.SukoonApp && window.SukoonApp.onUserAuthenticated) {
              window.SukoonApp.onUserAuthenticated(user);
            }
          } else {
            this.auth.signInAnonymously().catch(err => {
              console.warn("Firebase Anonymous Auth Notice:", err.message);
            });
          }
        });

        console.log("🚀 Firebase connected successfully to project: focus-e933d");
        return true;
      } else {
        console.warn("Firebase SDK script not loaded yet.");
        return false;
      }
    } catch (err) {
      console.error("Firebase Initialization Error:", err);
      return false;
    }
  },

  /**
   * Listen to real-time updates for Venues & Noise levels from Firestore
   */
  subscribeVenues(onUpdate) {
    if (!this.isInitialized || !this.db) return null;

    try {
      const unsubscribe = this.db.collection("venues").onSnapshot((snapshot) => {
        const venues = [];
        snapshot.forEach((doc) => {
          venues.push({ id: doc.id, ...doc.data() });
        });
        if (venues.length > 0 && typeof onUpdate === 'function') {
          onUpdate(venues);
        }
      }, (error) => {
        console.warn("Firestore venues subscription notice:", error.message);
      });
      this.listeners.push(unsubscribe);
      return unsubscribe;
    } catch (e) {
      console.warn("Firestore subscription error:", e);
      return null;
    }
  },

  /**
   * Submit live crowdsourced noise/quietness report for a venue
   */
  async submitNoiseReport(venueId, reportData) {
    if (!this.isInitialized || !this.db) {
      console.warn("Firebase not active. Update applied locally.");
      return { success: true, localOnly: true };
    }

    try {
      const venueRef = this.db.collection("venues").doc(venueId);
      const timestamp = new Date().toISOString();

      const newReport = {
        noiseLevel: reportData.noiseLevel, // 'hush', 'chill', 'lively'
        noiseLabel: reportData.noiseLabel,
        availability: reportData.availability || 'available',
        reportedAt: timestamp,
        userId: this.currentUser ? this.currentUser.uid : 'guest'
      };

      // Add to subcollection 'reports'
      await venueRef.collection("reports").add(newReport);

      // Update main venue document's current noise status
      await venueRef.set({
        noiseLevel: reportData.noiseLevel,
        noiseLabel: reportData.noiseLabel,
        availability: reportData.availability || 'available',
        lastReportedAt: timestamp,
        totalReports: firebase.firestore.FieldValue.increment(1)
      }, { merge: true });

      return { success: true };
    } catch (err) {
      console.error("Error submitting noise report to Firestore:", err);
      return { success: false, error: err };
    }
  },

  /**
   * Sync saved favorite venues for logged-in user in Firestore
   */
  async syncUserSavedVenues(venueIds) {
    if (!this.isInitialized || !this.db || !this.currentUser) return;

    try {
      const userRef = this.db.collection("users").doc(this.currentUser.uid);
      await userRef.set({
        savedVenues: venueIds,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.warn("Error syncing user saved venues:", err);
    }
  },

  /**
   * Save custom Firebase API credentials into localStorage
   */
  saveConfig(apiKey, senderId, appId) {
    const config = {
      apiKey: apiKey.trim(),
      authDomain: "focus-e933d.firebaseapp.com",
      projectId: "focus-e933d",
      storageBucket: "focus-e933d.firebasestorage.app",
      messagingSenderId: senderId ? senderId.trim() : "",
      appId: appId ? appId.trim() : ""
    };

    localStorage.setItem('focus_firebase_config_custom', JSON.stringify(config));
    localStorage.setItem('focus_firebase_api_key', apiKey.trim());
    if (senderId) localStorage.setItem('focus_firebase_sender_id', senderId.trim());
    if (appId) localStorage.setItem('focus_firebase_app_id', appId.trim());

    return this.init();
  }
};
