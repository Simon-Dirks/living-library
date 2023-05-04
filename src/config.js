import THEMES from "@/assets/data/themes.json";

export const Config = {
  THEMES: THEMES,
  IGNORED_THEMES: ["them.OTH"],
  USE_STATIC_TIMEFUNNEL_IMG: false,
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
    OTHERS: "Deliberations",
  },
  THEME_LOGBOOK_FILTER_VALUES: {
    ACHIEVEMENT_ASSESSMENT: "Achievement and Assessment",
    AFFECT: "Affect",
    CONTEXT_EDUCATION: "Context of Education",
    EQUITY: "Equity",
    TEACHING_PRACTICE: "Teaching Practice",
    TECHNOLOGY: "Technology",
    OTHERS: "Deliberations",
  },
  LIT_CSV_URL:
    "https://docs.google.com/spreadsheets/u/0/d/1mQYw67fH-_uWqw7u5q9b2fs3_ZVx1UoHUfoOigqBCck/gviz/tq?tqx=out:csv&tq=select+*",
  THEME_LOGBOOK_CSV_URL:
    "https://docs.google.com/spreadsheets/u/0/d/1Mm23FJ_BTWhQFhl8xY_SnMkX26rUsn9f/gviz/tq?tqx=out:csv&tq=select+*",
  NUM_LIT_ITEMS_PER_PAGE: 9999,
};
