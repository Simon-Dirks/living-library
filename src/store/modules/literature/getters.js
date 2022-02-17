import Config from "@/config";
import moment from "moment";

export default {
  getLoadingLiteratureData: (state) => {
    return state.loadingLiteratureData;
  },
  getLiteratureData: (state) => {
    return state.literatureData;
  },
  getShowReviewerContentNotesItem: (state) => (litItem) => {
    return (
      litItem[Config.LIT_CSV_KEYS.CONTENT_NOTES] &&
      state.showReviewerContentNotes
    );
  },
  getShowReviewerProcessNotesItem: (state) => (litItem) => {
    return (
      litItem[Config.LIT_CSV_KEYS.PROCESS_NOTES] &&
      state.showReviewerProcessNotes
    );
  },
  getShowReviewerContentNotes: (state) => {
    return state.showReviewerContentNotes;
  },
  getShowReviewerProcessNotes: (state) => {
    return state.showReviewerProcessNotes;
  },
  getShownResearchTypeKeys: (state) => {
    return state.shownResearchTypeKeys;
  },
  getShownEducationTypeKeys: (state) => {
    return state.shownEducationTypeKeys;
  },
  getDateFromLitItem: (state) => (litItem) => {
    let itemYear = litItem[Config.LIT_CSV_KEYS.DATE].replace(/\D/g, "");
    let itemMonth = litItem[Config.LIT_CSV_KEYS.DATE]
      .replace("date.", "")
      .replace(itemYear, "");
    const itemMonthStartsWithR = itemMonth[0].toLowerCase() === "r";
    if (itemMonthStartsWithR) {
      itemMonth = itemMonth.substring(1);
    }
    itemYear = "20" + itemYear;
    return new Date(itemMonth + " " + itemYear);
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
      return moment(litItem.date).isBetween(
        moment.unix(timeFilter.min),
        moment.unix(timeFilter.max)
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
  getFilteredLiterature: (state, getters, rootState, rootGetters) => {
    if (!getters.getLiteratureData) {
      return [];
    }
    let filteredLiteratureData = getters.getLiteratureData
      .filter((litItem) => getters.isLitItemWithinDateFilter(litItem))
      .filter((litItem) => getters.isLitItemShownByFilters(litItem));

    const noThemesSelected =
      rootGetters["themes/getSelectedThemeIds"].length === 0;
    if (noThemesSelected) {
      return filteredLiteratureData;
    }

    // Show literature tagged with (at least) one of the selected themes
    // shownLiteratureData = shownLiteratureData.filter(
    //   (litItem) => getters.getNumSelectedThemesForLitItem(litItem) > 0
    // );

    // Show literature tagged with ALL of the selected themes
    filteredLiteratureData = filteredLiteratureData.filter(
      (litItem) =>
        getters.getNumSelectedThemesForLitItem(litItem) ===
        rootGetters["themes/getSelectedThemeIds"].length
    );

    filteredLiteratureData.sort((firstItem, secondItem) => {
      return (
        getters.getNumSelectedThemesForLitItem(secondItem) -
        getters.getNumSelectedThemesForLitItem(firstItem)
      );
    });

    return filteredLiteratureData;
  },
};
