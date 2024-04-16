<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-icon
            name="book"
            class="ion-margin-end relative"
            style="top: 3px"
          ></ion-icon>
          Researcher Logbook
        </ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goToHome">
            <ion-icon name="arrow-back" />
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="downloadCsv" class="ion-padding-end">
            <ion-icon
              name="download"
              class="ion-margin-end relative"
              style="top: -2px"
            />
            Download as CSV
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <theme-log-filter></theme-log-filter>

      <theme-log-entries></theme-log-entries>
    </ion-content>
  </ion-page>
</template>

<script>
import { mapActions } from "vuex";
import { useHead } from "@vueuse/head";
import ThemeLogFilter from "@/components/theme-logbook/ThemeLogbookFilter.vue";
import ThemeLogEntries from "@/components/theme-logbook/ThemeLogbookEntries.vue";
import { Config } from "@/config";

export default {
  name: "ThemeLog",
  setup() {
    useHead({
      title: "Living Library - Theme Logbook",
    });
  },
  mixins: [],
  components: { ThemeLogFilter, ThemeLogEntries },
  computed: {},
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
    downloadCsv() {
      const link = document.createElement("a");
      link.href = Config.THEME_LOGBOOK_CSV_URL;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  mounted() {
    this.loadThemeLogbookData();
  },
};
</script>

<style scoped></style>
