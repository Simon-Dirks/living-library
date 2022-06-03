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
            <h2>Education level</h2>
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
            <h2>Show reviewer<br/>logs on</h2>
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
          <ion-col size="3" class="text-center">
            <ion-button size="small" fill="clear" id="themes-logs-button" @click="onLogbookButtonClicked">
              <ion-icon name="book"></ion-icon>
              <span>
                View themes logs
              </span>
            </ion-button>
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
    }),
    onLogbookButtonClicked() {
      window.location.href = "/theme-logbook";
    }
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
</style>

<style>
ion-checkbox {
  margin: 0 16px 0 0;
}

#themes-logs-button {
  --background: #52c1ee;
  --color: white;
  margin-top: 6px;
  font-weight: bold;
}

#themes-logs-button span {
  margin-left: 8px;
}

ion-toggle {
  padding-right: 0.5rem;
}
</style>
