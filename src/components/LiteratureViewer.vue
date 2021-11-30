<template>
  <ion-content class="literature-section-content">
    <div class="literature-filter-container">
      <h2 class="literature-section-title ion-padding-top">
        Literature ({{ literatureMixin_shown.length }})
      </h2>

      <literature-filter
        :onEducationFilterClicked="onEducationFilterClicked"
        :onLiteratureFilterClicked="onLiteratureFilterClicked"
      ></literature-filter>
    </div>

    <p v-if="loadingLiteratureData">
      <ion-spinner></ion-spinner>
      <em>Loading articles...</em>
    </p>

    <div class="literature-item-container">
      <template
        v-for="literatureItem in literatureMixin_shown"
        :key="literatureItem['Article name']"
      >
        <literature-item :literatureItem="literatureItem"></literature-item>
      </template>
    </div>
  </ion-content>
</template>

<script>
import LiteratureItem from "./LiteratureItem.vue";
import { literatureMixin } from "@/mixins/literatureMixin";

import Config from "@/config.js";
import LiteratureFilter from "@/components/LiteratureFilter";

export default {
  mixins: [literatureMixin],
  inject: ["getTimeFilter"],
  name: "LiteratureViewer",
  components: {
    LiteratureItem,
    LiteratureFilter,
  },
  data() {
    return { config: Config };
  },
  computed: {},
  methods: {
    onEducationFilterClicked(filterKey, event) {
      const showThisKey = event.target.checked;
      this.literatureMixin_toggleEducationFilter(filterKey, showThisKey);
    },
    onLiteratureFilterClicked(filterKey, event) {
      const showThisKey = event.target.checked;
      this.literatureMixin_toggleFilter(filterKey, showThisKey);
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
