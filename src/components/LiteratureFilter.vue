<template>
  <ion-card class="ion-no-margin">
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col size="3">
            <h3 style="margin-top: 0.6rem">Research type</h3>
          </ion-col>
          <ion-col
              v-for="[filterTitle, filterKey] in Object.entries(
              config.LIT_CSV_FILTER_KEYS
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
            <h3>Education level</h3>
          </ion-col>
          <ion-col
              v-for="[filterTitle, filterKey] in Object.entries(
              config.LIT_CSV_EDUCATION_FILTER_KEYS
            )"
              :key="filterKey"
              class="checkbox-container"
              size="3"
          >
            <ion-item @click="onEducationTypeFilterClicked(filterKey, $event)">
              <ion-label>{{ filterTitle }}</ion-label>
              <ion-checkbox checked slot="start"></ion-checkbox>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="3">
            <h3>Show reviewer's<br/>logs on</h3>
          </ion-col>
          <ion-col size="3" class="checkbox-container">
            <ion-item>
              <ion-toggle
                  slot="start"
                  name="show-reviewer-thoughts"
                  :checked="getShowReviewerContentNotes"
                  @ionChange="
                  updateShowReviewerContentNotes($event.target.checked)
                "
              ></ion-toggle>
              <ion-label>Literature</ion-label>
            </ion-item>
          </ion-col>
          <ion-col size="3" class="checkbox-container">
            <ion-item>
              <ion-toggle
                  slot="start"
                  name="show-reviewer-notes"
                  :checked="getShowReviewerProcessNotes"
                  @ionChange="
                  updateShowReviewerProcessNotes($event.target.checked)
                "
              ></ion-toggle>
              <ion-label>Coding</ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {Config} from "@/config";
import {mapGetters, mapMutations} from "vuex";

export default {
  components: {},
  data() {
    return {
      config: Config,
    };
  },
  computed: {
    ...mapGetters({
      getShowReviewerContentNotes: "literature/getShowReviewerContentNotes",
      getShowReviewerProcessNotes: "literature/getShowReviewerProcessNotes",
    }),
  },
  props: {
    onEducationTypeFilterClicked: {type: Function},
    onResearchTypeFilterClicked: {type: Function},
  },
  methods: {
    ...mapMutations({
      updateShowReviewerContentNotes:
          "literature/updateShowReviewerContentNotes",
      updateShowReviewerProcessNotes:
          "literature/updateShowReviewerProcessNotes",
    })

  },
};
</script>

<style>
ion-card-header {
  padding-bottom: 0;
}

.checkbox-container {
  padding: 0;
}

ion-checkbox {
  margin: 0 16px 0 0;
}

ion-toggle {
  padding-right: 0.5rem;
  zoom: 0.8;
}

ion-checkbox {
  zoom: 0.8;
}
</style>
