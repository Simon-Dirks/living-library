<template>
  <ion-content class="literature-section-content">
    <h2 class="literature-section-title">
      Literature ({{ shownLiteratureData.length }})
    </h2>
    <p v-if="loadingLiteratureData">
      <ion-spinner></ion-spinner><em>Loading articles...</em>
    </p>
    <template
      v-for="literatureItem in shownLiteratureData"
      :key="literatureItem['Article name']"
    >
      <literature-item :literatureItem="literatureItem"></literature-item>
    </template>
  </ion-content>
</template>

<script>
import LiteratureItem from "./LiteratureItem.vue";
import { IonContent, IonSpinner } from "@ionic/vue";
import { literatureMixin } from "@/mixins/literatureMixin";

export default {
  mixins: [literatureMixin],
  inject: ["getTimeFilter"],
  name: "LiteratureViewer",
  components: {
    IonContent,
    IonSpinner,
    LiteratureItem,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.literature-section-title {
  margin-left: 8px;
}

ion-spinner {
  margin-right: 10px;
  top: 8px;
}
</style>
