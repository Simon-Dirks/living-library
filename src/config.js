import THEMES from "@/assets/data/themes.json";

export default {
  THEMES: THEMES,
  IGNORED_THEMES: ["them.TEC", "them.OTH"],
  CSV_KEYS: {
    THEMES: ["Theme.FINDINGS", "Theme.IMPLICATIONS"],
    ARTICLE_LINK: "New Links",
    SUMMARY: "Summary",
    ARTICLE_NAME: "Article name",
    DATE: "Date",
    DATE_OF_CODING: "Date of coding",
    AUTHORS: "Authors",
    JOURNAL: "Journal",
  },
  STORAGE_URL: "gs://eduvision-living-library.appspot.com/",
  ARTICLES_CSV_FILENAME: "coded-articles.csv",
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyAuoxV0p_Z8Xe8B85okZff4Xf3lAol501o",
    authDomain: "eduvision-living-library.firebaseapp.com",
    projectId: "eduvision-living-library",
    storageBucket: "eduvision-living-library.appspot.com",
    messagingSenderId: "226974366663",
    appId: "1:226974366663:web:37f8256e1a11bf3e83b7e2",
  },
  DEBUG_MODE: true,
};
