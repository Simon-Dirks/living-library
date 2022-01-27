import Config from "@/config";
import literatureGetters from "@/store/modules/literature/getters";
import literatureActions from "@/store/modules/literature/actions";
import literatureMutations from "@/store/modules/literature/mutations";

const literatureModule = {
  namespaced: true,
  state() {
    return {
      literatureData: [],
      loadingLiteratureData: false,
      shownResearchTypeKeys: new Set(Object.values(Config.CSV_FILTER_KEYS)),
      shownEducationTypeKeys: new Set(
        Object.values(Config.CSV_EDUCATION_FILTER_KEYS)
      ),
    };
  },
  mutations: literatureMutations,
  actions: literatureActions,
  getters: literatureGetters,
};

export default literatureModule;