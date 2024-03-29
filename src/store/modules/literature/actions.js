import Papa from "papaparse";
import { Config } from "@/config";

export default {
  loadLiteratureData: async (context) => {
    context.commit("setLoadingLiteratureData", true);

    console.log("Loading literature...");

    const codedArticles = await context.dispatch("getCodedArticlesCsvFile");
    let literatureData = Papa.parse(codedArticles, {
      header: true,
      dynamicTyping: true,
    }).data;

    literatureData = literatureData.filter((litItem) => {
      const litItemHasName =
        litItem[Config.LIT_CSV_KEYS.ARTICLE_NAME] &&
        litItem[Config.LIT_CSV_KEYS.ARTICLE_NAME] !== "";
      return litItemHasName;
    });

    for (const litItem of literatureData) {
      // console.log("Parsing", litItem["Article name"]);
      litItem["themes"] = [];
      litItem["year"] = null;

      if (litItem[Config.LIT_CSV_KEYS.DATE]) {
        litItem["date"] = context.getters.getDateFromLitItem(litItem);

        // litItem[Config.LIT_CSV_KEYS.DATE_OF_CODING] = new Date(
        //   litItem[Config.LIT_CSV_KEYS.DATE_OF_CODING]
        // );
      }

      const journalIsUppercased =
        litItem[Config.LIT_CSV_KEYS.JOURNAL] ===
        litItem[Config.LIT_CSV_KEYS.JOURNAL].toUpperCase();
      if (litItem[Config.LIT_CSV_KEYS.JOURNAL] && journalIsUppercased) {
        // Capitalize each word
        litItem[Config.LIT_CSV_KEYS.JOURNAL] = litItem[
          Config.LIT_CSV_KEYS.JOURNAL
        ]
          .split(" ")
          .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
          })
          .join(" ");
      }

      const countryConductedRaw = litItem[Config.LIT_CSV_KEYS.COUNTRY];
      if (countryConductedRaw) {
        const countriesConductedStr = countryConductedRaw.split(";").join(", ");
        litItem[Config.LIT_CSV_KEYS.COUNTRY] = countriesConductedStr;
      }

      for (const themeKey of Config.LIT_CSV_KEYS.THEMES) {
        if (!litItem[themeKey] || litItem[themeKey] === "") {
          // console.warn(
          //   "Could not find themes for article:",
          //   litItem["Article name"]
          // );
          continue;
        }

        // Fix typos: replace colons with semi-colons
        litItem[themeKey] = litItem[themeKey].replace(":", ";").trim();
        const litItemThemes = litItem[themeKey].split(";");
        for (const litItemThemeCode of litItemThemes) {
          const hasValidTheme = litItemThemeCode !== "";
          const isIgnoredTheme =
            Config.IGNORED_THEMES.includes(litItemThemeCode);
          if (!hasValidTheme || isIgnoredTheme) {
            continue;
          }
          const themeId =
            context.rootGetters["themes/getThemeIdByLitCode"](litItemThemeCode);
          const themeNotYetSaved = !litItem["themes"].includes(themeId);
          if (themeNotYetSaved) {
            litItem["themes"].push(themeId);
          }
        }
      }
    }

    context.commit("setLiteratureData", literatureData);
    console.log("Literature loaded!", context.getters.getLiteratureData);

    context.commit("setLoadingLiteratureData", false);
  },
  updateResearchTypeFilter: (
    context,
    { researchTypeKey, showResearchType }
  ) => {
    if (showResearchType) {
      context.commit("showResearchType", researchTypeKey);
    } else {
      context.commit("hideResearchType", researchTypeKey);
    }

    console.log(
      "Research type filter:",
      context.getters.getShownResearchTypeKeys,
      researchTypeKey,
      showResearchType
    );
  },
  updateEducationTypeFilter: (
    context,
    { educationTypeKey, showEducationType }
  ) => {
    // TODO: Remove duplicated code (research type / education type filters)
    if (showEducationType) {
      context.commit("showEducationType", educationTypeKey);
    } else {
      context.commit("hideEducationType", educationTypeKey);
    }

    console.log(
      "Education type filter:",
      context.getters.getShownEducationTypeKeys
    );
  },
  getCodedArticlesCsvFile: async (context) => {
    console.log("Downloading coded articles file...", Config.LIT_CSV_URL);

    const rawResponse = await context.dispatch(
      "sendHttpRequest",
      {
        url: Config.LIT_CSV_URL,
        responseType: "text",
      },
      { root: true }
    );

    return rawResponse;
  },
};
