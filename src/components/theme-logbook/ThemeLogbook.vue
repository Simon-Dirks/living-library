<template>
  <ion-content>
    <p v-if="!logbookData" class="ion-padding-horizontal">
      <ion-spinner class="ion-margin-end" style="top: 8px"></ion-spinner>
      <em>Loading theme logbook data...</em>
    </p>
    <div v-if="logbookData">
      <ion-card
        v-for="logbookRow in logbookData"
        :key="JSON.stringify(logbookRow)"
      >
        <ion-card-header>
          <ion-card-title>
            {{ logbookRow[config.THEME_LOGBOOK_CSV_KEYS.DATE] }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <template v-for="(item, key) in logbookRow" :key="key">
            <div
              v-if="key !== config.THEME_LOGBOOK_CSV_KEYS.DATE && item"
              class="ion-padding-bottom"
            >
              <p>
                <strong>{{ key }}</strong>
              </p>
              <p>{{ item }}</p>
            </div>
          </template>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Config from "@/config";

export default {
  name: "ThemeLog",
  mixins: [],
  components: {},
  computed: {
    ...mapGetters({
      logbookData: "themeLogbook/getLogbookData",
      logbookColumnNames: "themeLogbook/getLogbookColumnNames",
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
  },
  mounted() {
    this.loadThemeLogbookData();
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
