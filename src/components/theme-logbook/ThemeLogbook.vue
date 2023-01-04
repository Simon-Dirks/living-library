<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-icon name="book" class="ion-margin-end relative" style="top: 3px"></ion-icon>
          Researcher Logbook
        </ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goToHome">
            <ion-icon name="arrow-back" />
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
  },
  mounted() {
    this.loadThemeLogbookData();
  },
};
</script>

<style scoped>
</style>
