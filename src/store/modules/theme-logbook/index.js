import themeLogbookActions from "@/store/modules/theme-logbook/actions";

const themeLogbookModule = {
  namespaced: true,
  state() {
    return {
      logbookData: null,
    };
  },
  mutations: {
    setLogbookData: (state, logbookData) => {
      state.logbookData = logbookData;
    },
  },
  actions: themeLogbookActions,
  getters: {
    getLogbookData: (state) => {
      return state.logbookData;
    },
    getLogbookColumnNames: (state) => {
      if (!state.logbookData) {
        return [];
      }
      return Object.keys(state.logbookData[0]);
    },
  },
};

export default themeLogbookModule;
