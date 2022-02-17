import THEMES from "@/assets/data/themes.json";

export default {
  THEMES: THEMES,
  IGNORED_THEMES: ["them.TEC", "them.OTH"],
  LIT_CSV_KEYS: {
    THEMES: ["Theme.FINDINGS", "Theme.IMPLICATIONS"],
    ARTICLE_LINK: "New Links",
    SUMMARY: "Summary",
    ARTICLE_NAME: "Article name",
    DATE: "Date",
    DATE_OF_CODING: "Date of coding",
    CODED_BY: "coded_by",
    AUTHORS: "Authors",
    JOURNAL: "Journal",
    COUNTRY: "country_conducted",
    CONTENT_NOTES: "Thoughts/Discussion points",
    PROCESS_NOTES: "Notes/Doubts",
  },
  LIT_CSV_FILTER_KEYS: {
    Reflections: "Reflection",
    Reviews: "Review",
    Research: "Research",
  },
  LIT_CSV_EDUCATION_FILTER_KEYS: {
    Secondary: "SecondaryEducation",
    Higher: "HigherEducation",
  },
  THEME_LOGBOOK_CSV_KEYS: {
    DATE: "Date",
    ACHIEVEMENT_ASSESSMENT: "Achievement and Assessment",
    AFFECT: "Affect",
    CONTEXT_EDUCATION: "Context of Education",
    EQUITY: "Equity",
    TEACHING_PRACTICE: "Teaching Practice",
    TECHNOLOGY: "Technology",
    OTHERS: "Others",
  },
  // STORAGE_URL: "gs://eduvision-living-library.appspot.com/",
  // ARTICLES_CSV_FILENAME: "coded-articles.csv",
  // FIREBASE_CONFIG: {
  //   apiKey: "AIzaSyAuoxV0p_Z8Xe8B85okZff4Xf3lAol501o",
  //   authDomain: "eduvision-living-library.firebaseapp.com",
  //   projectId: "eduvision-living-library",
  //   storageBucket: "eduvision-living-library.appspot.com",
  //   messagingSenderId: "226974366663",
  //   appId: "1:226974366663:web:37f8256e1a11bf3e83b7e2",
  // },
  LIT_CSV_URL:
    "https://docs.google.com/spreadsheets/u/0/d/1mQYw67fH-_uWqw7u5q9b2fs3_ZVx1UoHUfoOigqBCck/gviz/tq?tqx=out:csv&tq=select+*",
  THEME_LOGBOOK_CSV_URL:
    "https://docs.google.com/spreadsheets/u/0/d/1Mm23FJ_BTWhQFhl8xY_SnMkX26rUsn9f/gviz/tq?tqx=out:csv&tq=select+*",
  LINE_COLOR: "rgba(0, 0, 0, 0.45)",
  IMAGEAREAOFFSET: { xOffset: 0, yOffset: 0 },
  NUM_LIT_ITEMS_PER_PAGE: 9999,
  DEBUG_MODE: false,
};
