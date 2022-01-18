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
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script>
import Config from "@/config";

export default {
  components: {},
  data() {
    return {
      config: Config,
    };
  },
  props: {
    onEducationTypeFilterClicked: { type: Function },
    onResearchTypeFilterClicked: { type: Function },
  },
  methods: {},
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
