const timeFilterModule = {
  namespaced: true,
  state() {
    return {
      timeFilter: { min: null, max: null },
    };
  },
  mutations: {
    update(state, { min, max }) {
      state.timeFilter = { min: min, max: max };
    },
  },
  actions: {},
  getters: {
    get: (state) => {
      return state.timeFilter;
    },
  },
};

export default timeFilterModule;
