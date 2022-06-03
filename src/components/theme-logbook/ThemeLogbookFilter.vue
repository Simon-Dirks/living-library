<template>
  <ion-grid class="">
    <ion-row class="ion-padding-horizontal">
      <div class="ion-padding-end" style="margin-top: 4px;">
        <p>Show logs for themes:</p>
      </div>
      <div
        class="checkbox-container"
        v-for="(themeTitle, themeKey) in config.THEME_LOGBOOK_FILTER_VALUES"
        :key="themeKey"
      >
        <ion-item @click="onFilterToggle(themeKey)" v-if="selectedThemes">
          <ion-label>{{ themeTitle }}</ion-label>
          <ion-checkbox
            :checked="!selectedThemes.includes(selectedThemes[themeKey])"
            slot="start"
          ></ion-checkbox>
        </ion-item>
      </div>
    </ion-row>
  </ion-grid>
</template>

<script>
import { mapMutations } from "vuex";
import { Config } from "@/config";

export default {
  name: "ThemeLogFilter",
  data() {
    return {
      config: Config,
      selectedThemes: null,
    };
  },
  watch: {
    selectedThemes: {
      handler: function (updatedSelectedThemes, _) {
        this.updateSelectedThemes(updatedSelectedThemes);
      },
    },
  },
  methods: {
    ...mapMutations({
      updateSelectedThemes: "themeLogbook/updateSelectedThemes",
    }),
    onFilterToggle(themeKey) {
      const selectedThemes = [...this.selectedThemes];
      if (!selectedThemes.includes(themeKey)) {
        selectedThemes.push(themeKey);
      } else {
        selectedThemes.splice(selectedThemes.indexOf(themeKey), 1);
      }
      this.selectedThemes = selectedThemes;
    },
  },
  mounted() {
    this.selectedThemes = Object.keys(Config.THEME_LOGBOOK_FILTER_VALUES);
  },
};
</script>

<style scoped>
.checkbox-container {
  margin-top: 5px;
}
</style>
