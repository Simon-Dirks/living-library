<template>
  <ion-content class="literature-section-content">
    <div class="literature-filter-container">
      <h2 class="literature-section-title ion-padding-top">
        Literature ({{ shownLiterature.length }})
      </h2>

      <literature-filter
        :onEducationTypeFilterClicked="onEducationTypeFilterClicked"
        :onResearchTypeFilterClicked="onResearchTypeFilterClicked"
      ></literature-filter>
    </div>

    <p v-if="loadingLiteratureData">
      <ion-spinner></ion-spinner>
      <em>Loading articles...</em>
    </p>

    <div class="literature-item-container">
      <template
        v-for="literatureItem in shownLiterature"
        :key="literatureItem['Article name']"
      >
        <literature-item :literatureItem="literatureItem"></literature-item>
      </template>
    </div>
  </ion-content>
</template>

<script>
import LiteratureItem from "./LiteratureItem.vue";

import Config from "@/config.js";
import LiteratureFilter from "@/components/LiteratureFilter";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [],
  name: "LiteratureViewer",
  components: {
    LiteratureItem,
    LiteratureFilter,
  },
  data() {
    return { config: Config };
  },
  computed: {
    ...mapGetters({
      shownLiterature: "literature/getShownLiterature",
      loadingLiteratureData: "literature/getLoadingLiteratureData",
    }),
  },
  methods: {
    ...mapActions({
      updateResearchTypeFilter: "literature/updateResearchTypeFilter",
      updateEducationTypeFilter: "literature/updateEducationTypeFilter",
      loadLiteratureData: "literature/loadLiteratureData",
    }),
    onEducationTypeFilterClicked(educationTypeKey, event) {
      const showThisKey = event.target.checked;
      this.updateEducationTypeFilter({
        educationTypeKey,
        showEducationType: showThisKey,
      });
    },
    onResearchTypeFilterClicked(researchTypeKey, event) {
      const showThisKey = event.target.checked;
      this.updateResearchTypeFilter({
        researchTypeKey,
        showResearchType: showThisKey,
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.literature-section-title {
  margin-left: 8px;
  margin-bottom: 0;
  margin-top: 0;
}

ion-spinner {
  margin-right: 10px;
  top: 8px;
}

.literature-filter-container {
  position: sticky;
  top: 0;
  background: white;
  z-index: 9999;
}
</style>
