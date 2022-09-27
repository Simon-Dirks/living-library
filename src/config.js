import THEMES from "@/assets/data/themes.json";

export const Config = {
  THEMES: THEMES,
  IGNORED_THEMES: ["them.OTH"],
  LIT_CSV_KEYS: {
    THEMES: ["Theme FINDINGS", "Theme IMPLICATIONS"],
    ARTICLE_LINK: "Links",
    SUMMARY: "Summary",
    ARTICLE_NAME: "Article name",
    DATE: "Date",
    DATE_OF_CODING: "Date of coding",
    CODED_BY: "Coded by",
    AUTHORS: "Authors",
    JOURNAL: "Journal",
    COUNTRY: "country_conducted",
    CONTENT_NOTES: "Thoughts and discussion points",
    PROCESS_NOTES: "Notes and doubts",
  },
  LIT_CSV_FILTER_KEYS: {
    Reflections: "Reflection",
    Reviews: "Review",
    Research: "Research",
  },
  LIT_CSV_EDUCATION_FILTER_KEYS: {
    Secondary: "Secondary education",
    Higher: "Higher education",
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
    "https://docs.google.com/spreadsheets/u/0/d/1gnNDzvtY12XTl4Q4sQNxLFA5-G8jcLngryO7OKOo8aM/gviz/tq?tqx=out:csv&tq=select+*",
  THEME_LOGBOOK_CSV_URL:
    "https://docs.google.com/spreadsheets/u/0/d/1Mm23FJ_BTWhQFhl8xY_SnMkX26rUsn9f/gviz/tq?tqx=out:csv&tq=select+*",
  LINE_COLOR: "rgba(0, 0, 0, 0.45)",
  IMAGEAREAOFFSET: { xOffset: 0, yOffset: 0 },
  NUM_LIT_ITEMS_PER_PAGE: 9999,
  DEBUG_MODE: false,
};
