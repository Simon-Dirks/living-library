import Config from "@/config";
import lineDrawingActions from "@/store/modules/line-drawing/actions";

const lineDrawingModule = {
  namespaced: true,
  state() {
    return {
      linesState: "",
    };
  },
  mutations: {
    updateLinesState: (state, updatedLinesState) => {
      state.linesState = updatedLinesState;
    },
  },
  actions: lineDrawingActions,
  getters: {
    getLinesState: (state) => {
      return state.linesState;
    },
  },
};

export default lineDrawingModule;
