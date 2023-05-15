<template>
  <ion-content class="literature-section-content" :scroll-events="true">
    <div class="literature-filter-container">
      <h2 class="literature-section-title ion-padding-top">
        Literature ({{ filteredLiterature.length }})
      </h2>

      <ion-button
        size="small"
        fill="clear"
        id="themes-logs-button"
        @click="onLogbookButtonClicked"
      >
        <ion-icon name="book" class="ion-margin-end"></ion-icon>
        <span> View researcher logbook </span>
      </ion-button>
    </div>

    <p v-if="loadingLiteratureData">
      <ion-spinner></ion-spinner>
      <em>Loading articles...</em>
    </p>

    <div class="literature-item-container">
      <template v-for="(literatureItem, idx) in filteredLiterature" :key="idx">
        <literature-item :literatureItem="literatureItem"></literature-item>
      </template>
    </div>
  </ion-content>
</template>

<script>
import LiteratureItem from "./LiteratureItem.vue";

import { Config } from "@/config";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [],
  name: "LiteratureViewer",
  components: {
    LiteratureItem,
  },
  data() {
    return {
      config: Config,
    };
  },
  computed: {
    ...mapGetters({
      filteredLiterature: "literature/getFilteredLiterature",
      loadingLiteratureData: "literature/getLoadingLiteratureData",
    }),
  },
  methods: {
    ...mapActions({
      loadLiteratureData: "literature/loadLiteratureData",
    }),
    onLogbookButtonClicked() {
      window.location.href = "/researcher-logbook";
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

#themes-logs-button {
  --background: #52c1ee;
  --color: white;
  /*font-weight: bold;*/
  position: absolute;
  right: 8px;
  top: 12px;
}
</style>
