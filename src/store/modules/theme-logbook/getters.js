import Config from "@/config";

export default {
  getLogbookData: (state) => {
    return state.logbookData;
  },
  getLogbookColumnNames: (state) => {
    if (!state.logbookData) {
      return [];
    }
    return Object.keys(state.logbookData[0]);
  },
  getFilteredLogbookData: (state, getters, _) => {
    if (!getters.getLogbookData) {
      return null;
    }

    const filteredLogbookData = {};
    for (const logbookRow of getters.getLogbookData) {
      const date = logbookRow[Config.THEME_LOGBOOK_CSV_KEYS.DATE];
      for (const [columnKey, cellValue] of Object.entries(logbookRow)) {
        const isDateColumn = columnKey === Config.THEME_LOGBOOK_CSV_KEYS.DATE;

        const themeKey = Object.keys(Config.THEME_LOGBOOK_CSV_KEYS).find(
          (key) => Config.THEME_LOGBOOK_CSV_KEYS[key] === columnKey
        );
        const logThemeIsSelected = Object.values(state.selectedThemes).includes(
          themeKey
        );
        if (isDateColumn || !cellValue || !logThemeIsSelected) {
          continue;
        }

        if (!(date in filteredLogbookData)) {
          filteredLogbookData[date] = {};
        }

        filteredLogbookData[date][columnKey] = cellValue;
      }
    }

    console.log("Filtered logbook data:", filteredLogbookData);
    return filteredLogbookData;
  },
};
