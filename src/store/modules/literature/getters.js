import Config from "@/config";
import fileLiteratureData from "@/assets/data/coded-articles.csv";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default {
  getLoadingLiteratureData: (state) => {
    return state.loadingLiteratureData;
  },
  getLiteratureData: (state) => {
    return state.literatureData;
  },
  getShownResearchTypeKeys: (state) => {
    return state.shownResearchTypeKeys;
  },
  getShownEducationTypeKeys: (state) => {
    return state.shownEducationTypeKeys;
  },
  getDateFromLitItem: (state) => (litItem) => {
    let itemYear = litItem[Config.CSV_KEYS.DATE].replace(/\D/g, "");
    let itemMonth = litItem[Config.CSV_KEYS.DATE]
      .replace("date.", "")
      .replace(itemYear, "");
    const itemMonthStartsWithR = itemMonth[0].toLowerCase() === "r";
    if (itemMonthStartsWithR) {
      itemMonth = itemMonth.substring(1);
    }
    itemYear = "20" + itemYear;
    return new Date(itemMonth + " " + itemYear);
  },
  getCodedArticlesCsvFile: async (state) => {
    if (Config.DEBUG_MODE) {
      return Promise.resolve(fileLiteratureData);
    }

    const storage = getStorage();
    const codedArticlesStorageRef = ref(
      storage,
      Config.STORAGE_URL + Config.ARTICLES_CSV_FILENAME
    );
    const url = await getDownloadURL(codedArticlesStorageRef).catch((error) => {
      return Promise.reject(error);
    });

    console.log("Downloading coded articles file...", url);

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = async (event) => {
        const blob = xhr.response;
        console.log("Downloaded coded articles file!");
        const blobText = await blob.text();
        return resolve(blobText);
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      };
      xhr.open("GET", url);
      xhr.send();
    });
  },
  getNumSelectedThemesForLitItem:
    (state, getters, rootState, rootGetters) => (litItem) => {
      let numSelectedThemesForLitItem = 0;
      const litItemThemes = litItem["themes"];
      for (const selectedThemeId of rootGetters["themes/getSelectedThemeIds"]) {
        const litItemThemeIsSelected = litItemThemes.includes(selectedThemeId);
        if (litItemThemeIsSelected) {
          numSelectedThemesForLitItem++;
        }
      }

      return numSelectedThemesForLitItem;
    },
  isLitItemWithinDateFilter:
    (state, getters, rootState, rootGetters) => (litItem) => {
      const litItemHasDate = litItem?.date;
      if (!litItemHasDate) {
        return true;
      }
      const timeFilter = rootGetters["timeFilter/get"];
      const invalidTimeFilter = !timeFilter.min || !timeFilter.max;
      if (invalidTimeFilter) {
        return true;
      }

      return (
        litItem.date <= new Date(timeFilter.max) &&
        litItem.date >= new Date(timeFilter.min)
      );
    },
  isLitItemShownByFilters: (state, getters) => (litItem) => {
    let itemResearchTypeShouldBeShown = false;
    let itemEducationTypeShouldBeShown = false;

    for (const [idx, shownKeys] of [
      getters.getShownResearchTypeKeys,
      getters.getShownEducationTypeKeys,
    ].entries()) {
      const isResearchTypeFilter = idx === 0;

      for (const shownKey of shownKeys) {
        const itemShouldBeShown = litItem[shownKey];
        if (!itemShouldBeShown) {
          continue;
        }
        if (isResearchTypeFilter) {
          itemResearchTypeShouldBeShown = true;
        } else {
          itemEducationTypeShouldBeShown = true;
        }
      }
    }
    return itemResearchTypeShouldBeShown && itemEducationTypeShouldBeShown;
  },
  getShownLiterature: (state, getters, rootState, rootGetters) => {
    if (!getters.getLiteratureData) {
      return [];
    }
    let shownLiteratureData = getters.getLiteratureData
      .filter((litItem) => getters.isLitItemWithinDateFilter(litItem))
      .filter((litItem) => getters.isLitItemShownByFilters(litItem));

    const noThemesSelected =
      rootGetters["themes/getSelectedThemeIds"].length === 0;
    if (noThemesSelected) {
      return shownLiteratureData;
    }

    // Show literature tagged with (at least) one of the selected themes
    // shownLiteratureData = shownLiteratureData.filter(
    //   (litItem) => getters.getNumSelectedThemesForLitItem(litItem) > 0
    // );

    // Show literature tagged with ALL of the selected themes
    shownLiteratureData = shownLiteratureData.filter(
      (litItem) =>
        getters.getNumSelectedThemesForLitItem(litItem) ===
        rootGetters["themes/getSelectedThemeIds"].length
    );

    shownLiteratureData.sort((firstItem, secondItem) => {
      return (
        getters.getNumSelectedThemesForLitItem(secondItem) -
        getters.getNumSelectedThemesForLitItem(firstItem)
      );
    });

    return shownLiteratureData;
  },
};
