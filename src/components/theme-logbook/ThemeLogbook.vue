<template>
  <ion-content class="ion-padding-horizontal">
    <p v-if="!logbookData">
      <ion-spinner class="ion-margin-end" style="top: 8px"></ion-spinner>
      <em>Loading theme logbook data...</em>
    </p>
    <div v-if="logbookData">
      <div v-for="logbookRow in logbookData" :key="JSON.stringify(logbookRow)">
        <div v-for="(item, key) in logbookRow" :key="key">
          <template v-if="key !== config.THEME_LOGBOOK_CSV_KEYS.DATE && item">
            <p>
              <strong>{{
                logbookRow[config.THEME_LOGBOOK_CSV_KEYS.DATE]
              }}</strong>
            </p>
            <p>{{ key }}: {{ item }}</p>
          </template>
        </div>
      </div>
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
