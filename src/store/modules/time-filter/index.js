const timeFilterModule = {
  namespaced: true,
  state() {
    return {
      timeFilter: { min: null, max: null },
      minNumSecondsDiffToUpdateFilter: 60 * 60 * 24 * 7,
      draggingTimeFilter: false,
    };
  },
  mutations: {
    update(state, { min, max }) {
      const minDiff = Math.abs(state.timeFilter.min - min);
      const maxDiff = Math.abs(state.timeFilter.max - max);
      const minHasChanged = min !== state.timeFilter.min;
      const maxHasChanged = max !== state.timeFilter.max;
      if (minHasChanged && minDiff > state.minNumSecondsDiffToUpdateFilter) {
        state.timeFilter.min = min;
      }
      if (maxHasChanged && maxDiff > state.minNumSecondsDiffToUpdateFilter) {
        state.timeFilter.max = max;
      }
    },
    onStartDraggingTimeFilter(state) {
      // console.log("Started dragging");
      state.draggingTimeFilter = true;
    },
    onStopDraggingTimeFilter(state) {
      // console.log("Stopped dragging");
      state.draggingTimeFilter = false;
    },
  },
  actions: {},
  getters: {
    get: (state) => {
      return state.timeFilter;
    },
    isDragging: (state) => {
      console.log(state.draggingTimeFilter);
      return state.draggingTimeFilter;
    },
  },
};

export default timeFilterModule;
