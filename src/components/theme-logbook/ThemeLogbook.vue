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

      <theme-log-filter></theme-log-filter>

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
import ThemeLogFilter from "@/components/theme-logbook/ThemeLogbookFilter";

export default {
  name: "ThemeLog",
  setup() {
    useHead({
      title: "Living Library - Theme Logbook",
    });
  },
  mixins: [],
  components: { ThemeLogFilter },
  computed: {
    ...mapGetters({
      logbookColumnNames: "themeLogbook/getLogbookColumnNames",
      filteredLogbookData: "themeLogbook/getFilteredLogbookData",
    }),
  },
  data() {
    return {
      config: Config,
    };
  },
  methods: {
    ...mapActions({
      loadThemeLogbookData: "themeLogbook/loadThemeLogbookData",
    }),

    goToHome() {
      // TODO: Use Ionic router instead (or ion-back-button with default href)
      window.location.href = "/";
    },
  },
  mounted() {
    this.loadThemeLogbookData();
  },
};
</script>

<style></style>
