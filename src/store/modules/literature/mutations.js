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
  updateShowReviewerContentNotes: (state, isShown) => {
    state.showReviewerContentNotes = isShown;
  },
  updateShowReviewerProcessNotes: (state, isShown) => {
    state.showReviewerProcessNotes = isShown;
  },
};
