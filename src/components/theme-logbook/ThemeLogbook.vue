<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Theme Logbook</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goToHome">
            <ion-icon name="arrow-back" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <p v-if="!filteredLogbookData" class="ion-padding-horizontal">
        <ion-spinner class="ion-margin-end" style="top: 8px"></ion-spinner>
        <em>Loading theme logbook data...</em>
      </p>

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
      <div v-if="filteredLogbookData">
        <ion-card
          v-for="(logbookEntries, logbookEntryDate) in filteredLogbookData"
          :key="JSON.stringify(logbookEntryDate)"
        >
          <ion-card-header>
            <ion-card-title>
              {{ logbookEntryDate }}
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <template
              v-for="(logText, columnKey) in logbookEntries"
              :key="columnKey"
            >
              <div
                v-if="
                  columnKey !== config.THEME_LOGBOOK_CSV_KEYS.DATE && logText
                "
                class="ion-padding-bottom"
              >
                <p>
                  <strong>{{ columnKey }}</strong>
                </p>
                <p>{{ logText }}</p>
              </div>
            </template>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import Config from "@/config";
import { useHead } from "@vueuse/head";

export default {
  name: "ThemeLog",
  setup() {
    useHead({
      title: "Living Library - Theme Logbook",
    });
  },
  mixins: [],
  components: {},
  computed: {
    ...mapGetters({
      logbookColumnNames: "themeLogbook/getLogbookColumnNames",
      filteredLogbookData: "themeLogbook/getFilteredLogbookData",
    }),
  },
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
    ...mapActions({
      loadThemeLogbookData: "themeLogbook/loadThemeLogbookData",
    }),
    ...mapMutations({
      updateSelectedThemes: "themeLogbook/updateSelectedThemes",
    }),
    goToHome() {
      // TODO: Use Ionic router instead (or ion-back-button with default href)
      window.location.href = "/";
    },
  },
  mounted() {
    this.loadThemeLogbookData();
    this.selectedThemes = Object.keys(Config.THEME_LOGBOOK_FILTER_VALUES);
  },
};
</script>

<style>
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
