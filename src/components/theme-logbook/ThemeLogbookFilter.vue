<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-item>
          <ion-label>Show logs for themes:</ion-label>
          <ion-select multiple interface="alert" v-model="selectedThemes">
            <ion-select-option
              v-for="(
                themeTitle, themeKey
              ) in config.THEME_LOGBOOK_FILTER_VALUES"
              :key="themeKey"
              :value="themeKey"
              >{{ themeTitle }}
            </ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import Config from "@/config";
import { mapMutations } from "vuex";

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
  },
  mounted() {
    this.selectedThemes = Object.keys(Config.THEME_LOGBOOK_FILTER_VALUES);
  },
};
</script>
