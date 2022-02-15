export default {
  setLoadingLiteratureData: (state, isLoading) => {
    state.loadingLiteratureData = isLoading;
  },
  setLiteratureData: (state, literatureData) => {
    state.literatureData = literatureData;
  },
  showResearchType: (state, researchTypeKey) => {
    state.shownResearchTypeKeys.add(researchTypeKey);
  },
  hideResearchType: (state, researchTypeKey) => {
    state.shownResearchTypeKeys.delete(researchTypeKey);
  },
  showEducationType: (state, educationTypeKey) => {
    state.shownEducationTypeKeys.add(educationTypeKey);
  },
  hideEducationType: (state, educationTypeKey) => {
    state.shownEducationTypeKeys.delete(educationTypeKey);
  },
  updateShowReviewerThoughts: (state, isShown) => {
    state.showReviewerThoughts = isShown;
  },
  updateShowReviewerNotes: (state, isShown) => {
    state.showReviewerNotes = isShown;
  },
};
