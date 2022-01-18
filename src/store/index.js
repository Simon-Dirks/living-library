import { createStore } from "vuex";
import themeModule from "@/store/modules/themes";
import literatureModule from "@/store/modules/literature";
import timeFilterModule from "@/store/modules/time-filter";

const store = createStore({
  modules: {
    themes: themeModule,
    literature: literatureModule,
    timeFilter: timeFilterModule,
  },
  state() {
    return {};
  },
  mutations: {},
  getters: {},
});

export default store;
