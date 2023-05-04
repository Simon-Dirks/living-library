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
            <theme-button
              :theme-id="getThemeIdFromLogbookCsvId(columnKey)"
              :disable-click="true"
              :hide-info-button="true"
            ></theme-button>
            <open-pin-board-button
              :log-id="getLogId(columnKey, logbookEntryDate)"
              :db-log-book-id="'themeLogbookComments'"
              :log-text="logText"
              :num-comments="
                getNumComments(getLogId(columnKey, logbookEntryDate))
              "
            ></open-pin-board-button>
            <p class="ion-no-margin">{{ logText }}</p>
          </div>
        </template>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Config } from "@/config";
import ThemeButton from "@/components/ThemeButton.vue";
import { getDatabase, onValue, ref } from "firebase/database";
import OpenPinBoardButton from "@/components/pin-board/OpenPinBoardButton.vue";
import { getApps } from "firebase/app";

export default {
  name: "ThemeLogEntries",
  components: { OpenPinBoardButton, ThemeButton },
  data() {
    return {
      comments: {},
      config: Config,
      firebaseIsInitialized: false,
    };
  },
  computed: {
    ...mapGetters({
      filteredLogbookData: "themeLogbook/getFilteredLogbookData",
      getThemeTitle: "themes/getThemeTitle",
    }),
  },
  mounted() {
    this.firebaseIsInitialized = getApps().length > 0;
    if (this.firebaseIsInitialized) {
      const db = getDatabase();
      const commentsRef = ref(db, "themeLogbookComments");
      onValue(commentsRef, (snapshot) => {
        this.comments = snapshot.val();
      });
    }
  },
  methods: {
    getThemeIdFromLogbookCsvId(logbookCsvId) {
      if (
        logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.ACHIEVEMENT_ASSESSMENT
      ) {
        return "academicAchievementAssessment";
      } else if (logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.AFFECT) {
        return "affect";
      } else if (
        logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.CONTEXT_EDUCATION
      ) {
        return "contextTeaching";
      } else if (logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.EQUITY) {
        return "equity";
      } else if (
        logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.TEACHING_PRACTICE
      ) {
        return "teachingPractice";
      } else if (logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.TECHNOLOGY) {
        return "Technology";
      } else if (logbookCsvId === Config.THEME_LOGBOOK_CSV_KEYS.OTHERS) {
        return "Deliberations";
      }
      return logbookCsvId;
    },
    getNumComments(logId) {
      if (!this.comments || !logId || !(logId in this.comments)) {
        return null;
      }
      return Object.keys(this.comments[logId]).length;
    },
    getLogId(columnKey, logDate) {
      if (!columnKey || !logDate) {
        return null;
      }

      return (
        this.getThemeTitle(this.getThemeIdFromLogbookCsvId(columnKey)) +
        " " +
        logDate
      );
    },
  },
};
</script>

<style scoped>
ion-chip {
  margin-right: 0;
}
</style>
