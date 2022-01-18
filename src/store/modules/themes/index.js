import themeMutations from "@/store/modules/themes/mutations";
import themeGetters from "@/store/modules/themes/getters";

const themeModule = {
  namespaced: true,
  state() {
    return {
      selectedThemeIds: [],
    };
  },
  mutations: themeMutations,
  actions: {},
  getters: themeGetters,
};

export default themeModule;
