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
            <ion-button
              size="small"
              fill="clear"
              @click="
                openPinBoard(getLogId(columnKey, logbookEntryDate), logText)
              "
            >
              <ion-icon name="chatbubbles"></ion-icon>
              <ion-badge color="primary">
                {{ getNumComments(getLogId(columnKey, logbookEntryDate)) }}
              </ion-badge>
            </ion-button>
            <span>{{ logText }}</span>
          </div>
        </template>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Config } from "@/config";
import ThemeButton from "@/components/ThemeButton";
import { modalController } from "@ionic/vue";
import PinBoard from "@/components/pin-board/PinBoard";
import { getDatabase, onValue, ref } from "firebase/database";

export default {
  name: "ThemeLogEntries",
  components: { ThemeButton },
  data() {
    return {
      comments: {},
      config: Config,
    };
  },
  computed: {
    ...mapGetters({
      filteredLogbookData: "themeLogbook/getFilteredLogbookData",
      getThemeTitle: "themes/getThemeTitle",
    }),
  },
  mounted() {
    const db = getDatabase();
    const commentsRef = ref(db, "themeLogbookComments");
    onValue(commentsRef, (snapshot) => {
      this.comments = snapshot.val();
    });
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
    async openPinBoard(logId, logText) {
      const modal = await modalController.create({
        component: PinBoard,
        componentProps: {
          logId: logId,
          logText: logText,
        },
      });

      await modal.present();
    },
    getNumComments(logId) {
      if (!logId || !(logId in this.comments)) {
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
