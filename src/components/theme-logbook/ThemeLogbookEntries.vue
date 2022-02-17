<template>
  <p v-if="!filteredLogbookData" class="ion-padding-horizontal">
    <ion-spinner class="ion-margin-end" style="top: 8px"></ion-spinner>
    <em>Loading theme logbook data...</em>
  </p>

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
            v-if="columnKey !== config.THEME_LOGBOOK_CSV_KEYS.DATE && logText"
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
</template>

<script>
import { mapGetters } from "vuex";
import { Config } from "@/config";

export default {
  name: "ThemeLogEntries",
  data() {
    return {
      config: Config,
    };
  },
  computed: {
    ...mapGetters({
      filteredLogbookData: "themeLogbook/getFilteredLogbookData",
    }),
  },
};
</script>
