import literatureGetters from "@/store/modules/literature/getters";
import literatureActions from "@/store/modules/literature/actions";
import literatureMutations from "@/store/modules/literature/mutations";
import { Config } from "@/config";

const literatureModule = {
  namespaced: true,
  state() {
    return {
      literatureData: [],
      loadingLiteratureData: false,
      shownResearchTypeKeys: new Set(Object.values(Config.LIT_CSV_FILTER_KEYS)),
      shownEducationTypeKeys: new Set(
        Object.values(Config.LIT_CSV_EDUCATION_FILTER_KEYS)
      ),
      showReviewerContentNotes: true,
      showReviewerProcessNotes: true,
    };
  },
  mutations: literatureMutations,
  actions: literatureActions,
  getters: literatureGetters,
};

export default literatureModule;
