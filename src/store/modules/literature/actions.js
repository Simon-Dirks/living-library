import Papa from "papaparse";
import Config from "@/config";

export default {
  loadLiteratureData: async (context) => {
    context.commit("setLoadingLiteratureData", true);

    console.log("Loading literature...");

    const codedArticles = await context.getters.getCodedArticlesCsvFile;
    let literatureData = Papa.parse(codedArticles, {
      header: true,
      dynamicTyping: true,
    }).data;

    literatureData = literatureData.filter((litItem) => {
      const litItemHasName =
        litItem[Config.CSV_KEYS.ARTICLE_NAME] &&
        litItem[Config.CSV_KEYS.ARTICLE_NAME] !== "";
      return litItemHasName;
    });

    for (const litItem of literatureData) {
      // console.log("Parsing", litItem["Article name"]);
      litItem["themes"] = [];
      litItem["year"] = null;

      if (litItem[Config.CSV_KEYS.DATE]) {
        litItem["date"] = context.getters.getDateFromLitItem(litItem);

        // litItem[Config.CSV_KEYS.DATE_OF_CODING] = new Date(
        //   litItem[Config.CSV_KEYS.DATE_OF_CODING]
        // );
      }

      const countryConductedRaw = litItem[Config.CSV_KEYS.COUNTRY];
      if (countryConductedRaw) {
        const countriesConductedStr = countryConductedRaw.split(";").join(", ");
        litItem[Config.CSV_KEYS.COUNTRY] = countriesConductedStr;
      }

      for (const themeKey of Config.CSV_KEYS.THEMES) {
        if (!litItem[themeKey] || litItem[themeKey] === "") {
          // console.warn(
          //   "Could not find themes for article:",
          //   litItem["Article name"]
          // );
          continue;
        }

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
};
