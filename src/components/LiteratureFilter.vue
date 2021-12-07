<template>
  <ion-card>
    <!--    <ion-card-header>-->
    <!--      <ion-card-title>Research type</ion-card-title>-->
    <!--    </ion-card-header>-->
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <ion-col size="2">
            <h2>Research type</h2>
          </ion-col>
          <ion-col
            v-for="[filterTitle, filterKey] in Object.entries(
              config.CSV_FILTER_KEYS
            )"
            :key="filterKey"
            class="checkbox-container"
          >
            <ion-item @click="onLiteratureFilterClicked(filterKey, $event)">
              <ion-label>{{ filterTitle }}</ion-label>
              <ion-checkbox checked slot="start"></ion-checkbox>
            </ion-item>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="2">
            <h2>Education level</h2>
          </ion-col>
          <ion-col
            v-for="[filterTitle, filterKey] in Object.entries(
              config.CSV_EDUCATION_FILTER_KEYS
            )"
            :key="filterKey"
            class="checkbox-container"
          >
            <ion-item @click="onEducationFilterClicked(filterKey, $event)">
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
import { literatureMixin } from "@/mixins/literatureMixin";

export default {
  mixins: [literatureMixin],
  components: {},
  data() {
    return {
      config: Config,
    };
  },
  props: {
    onEducationFilterClicked: { type: Function },
    onLiteratureFilterClicked: { type: Function },
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
