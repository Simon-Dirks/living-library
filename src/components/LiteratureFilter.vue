<template>
  <ion-card>
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col size="3">
            <h2>Research type</h2>
          </ion-col>
          <ion-col
            v-for="[filterTitle, filterKey] in Object.entries(
              config.CSV_FILTER_KEYS
            )"
            :key="filterKey"
            class="checkbox-container"
          >
            <ion-item @click="onResearchTypeFilterClicked(filterKey, $event)">
              <ion-label>{{ filterTitle }}</ion-label>
              <ion-checkbox checked slot="start"></ion-checkbox>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="3">
            <h2>Education level</h2>
          </ion-col>
          <ion-col
            v-for="[filterTitle, filterKey] in Object.entries(
              config.CSV_EDUCATION_FILTER_KEYS
            )"
            :key="filterKey"
            class="checkbox-container"
          >
            <ion-item @click="onEducationTypeFilterClicked(filterKey, $event)">
              <ion-label>{{ filterTitle }}</ion-label>
              <ion-checkbox checked slot="start"></ion-checkbox>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6" class="checkbox-container">
            <ion-item>
              <ion-toggle
                slot="start"
                name="show-reviewer-thoughts"
                :checked="getShowReviewerThoughts"
                @ionChange="updateShowReviewerThoughts($event.target.checked)"
              ></ion-toggle>
              <ion-label>Show reviewer's thoughts?</ion-label>
            </ion-item>
          </ion-col>
          <ion-col size="6" class="checkbox-container">
            <ion-item>
              <ion-toggle
                slot="start"
                name="show-reviewer-notes"
                :checked="getShowReviewerNotes"
                @ionChange="updateShowReviewerNotes($event.target.checked)"
              ></ion-toggle>
              <ion-label>Show reviewer's doubts?</ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script>
import Config from "@/config";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {},
  data() {
    return {
      config: Config,
    };
  },
  computed: {
    ...mapGetters({
      getShowReviewerThoughts: "literature/getShowReviewerThoughts",
      getShowReviewerNotes: "literature/getShowReviewerNotes",
    }),
  },
  props: {
    onEducationTypeFilterClicked: { type: Function },
    onResearchTypeFilterClicked: { type: Function },
  },
  methods: {
    ...mapMutations({
      updateShowReviewerThoughts: "literature/updateShowReviewerThoughts",
      updateShowReviewerNotes: "literature/updateShowReviewerNotes",
    }),
  },
};
</script>

<style scoped>
ion-card-header {
  padding-bottom: 0;
}

.checkbox-container {
  padding: 0;
}
</style>

<style>
ion-checkbox {
  margin: 0 16px 0 0;
}
</style>
