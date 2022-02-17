import themeLogbookActions from "@/store/modules/theme-logbook/actions";
import themeLogbookGetters from "@/store/modules/theme-logbook/getters";

const themeLogbookModule = {
  namespaced: true,
  state() {
    return {
      logbookData: null,
      selectedThemes: [],
    };
  },
  mutations: {
    setLogbookData: (state, logbookData) => {
      state.logbookData = logbookData;
    },
    updateSelectedThemes: (state, selectedThemes) => {
      state.selectedThemes = Object.values(selectedThemes);
      console.log("UPDATED SELECTED THEMES:", state.selectedThemes);
    },
  },
  actions: themeLogbookActions,
  getters: themeLogbookGetters,
};

export default themeLogbookModule;
