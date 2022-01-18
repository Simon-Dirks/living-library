export default {
  toggleTheme(state, themeId) {
    const themeIdIdx = state.selectedThemeIds.indexOf(themeId);
    const themeIsAlreadySelected = themeIdIdx !== -1;

    if (themeIsAlreadySelected) {
      state.selectedThemeIds.splice(themeIdIdx, 1);
    } else {
      state.selectedThemeIds.push(themeId);
    }

    console.log("Selected themes:", state.selectedThemeIds);
  },
};
