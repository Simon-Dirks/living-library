<template>
  <ion-card>
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <!-- Literature item -->
          <ion-col
            :size="itemHasLogs() ? 7 : 12"
            :class="`ion-padding-end ${itemHasLogs() ? 'border-right' : ''}`"
          >
            <ion-card-title
              >{{ literatureItem["Article name"] }}
            </ion-card-title>
            <ion-card-subtitle
              v-if="literatureItem[config.LIT_CSV_KEYS.SUMMARY]"
            >
              {{ literatureItem[config.LIT_CSV_KEYS.SUMMARY] }}
            </ion-card-subtitle>

            <p v-if="literatureItem[config.LIT_CSV_KEYS.COUNTRY]">
              <ion-icon class="ion-margin-end" name="globe" />
              <span>{{ literatureItem[config.LIT_CSV_KEYS.COUNTRY] }}</span>
            </p>

            <template v-if="literatureItem">
              <theme-button
                v-for="themeId in literatureItem['themes']"
                :theme-id="themeId"
                :theme-reasoning="literatureItem[getThemeReasoningKey(themeId)]"
                :key="themeId"
              ></theme-button>
            </template>

            <br />

            <div class="open-pin-board-button">
              <open-pin-board-button
                :log-text="null"
                :log-id="getArticleLogId(literatureItem)"
                :db-log-book-id="'articleComments'"
                :num-comments="getNumComments(getArticleLogId(literatureItem))"
              ></open-pin-board-button>
            </div>

            <p class="literature-info-item">
              <a
                :href="literatureItem[config.LIT_CSV_KEYS.ARTICLE_LINK]"
                target="_blank"
              >
                <ion-icon name="link" />
                <span v-if="literatureItem[config.LIT_CSV_KEYS.AUTHORS]">
                  {{ literatureItem[config.LIT_CSV_KEYS.AUTHORS] }}</span
                ><span v-else>Article link</span>
              </a>
            </p>

            <p class="literature-info-item">
              <ion-icon name="newspaper" />
              <span>{{ literatureItem[config.LIT_CSV_KEYS.JOURNAL] }}</span>
            </p>

            <p class="literature-info-item">
              <ion-icon name="calendar" />
              <span>{{
                moment(literatureItem["date"]).format("MMMM YYYY")
              }}</span>
            </p>

            <p
              class="literature-info-item"
              v-if="literatureItem[config.LIT_CSV_KEYS.COUNTRY]"
            >
              <ion-icon class="ion-margin-end" name="globe" />
              <span>{{ literatureItem[config.LIT_CSV_KEYS.COUNTRY] }}</span>
            </p>

            <!--      <p>-->
            <!--        <ion-icon class="ion-margin-end" name="calendar" />-->
            <!--        <span>Date of coding: {{ literatureItem[config.LIT_CSV_KEYS.DATE_OF_CODING] }}</span>-->
            <!--      </p>-->

            <!--      <p v-if="literatureItem[config.LIT_CSV_KEYS.CODED_BY]">-->
            <!--        <small>-->
            <!--          <em-->
            <!--            >Coded by: {{ literatureItem[config.LIT_CSV_KEYS.CODED_BY] }}-->
            <!--            <span v-if="literatureItem[config.LIT_CSV_KEYS.DATE_OF_CODING]">-->
            <!--              ({{ literatureItem[config.LIT_CSV_KEYS.DATE_OF_CODING] }})-->
            <!--            </span>-->
            <!--          </em>-->
            <!--        </small>-->
            <!--      </p>-->
          </ion-col>

          <!-- Literature item logs -->
          <ion-col :size="itemHasLogs() ? 5 : 0" class="ion-no-padding">
            <div class="ion-padding-start">
              <div class="thoughts-text-container" v-if="itemHasLogs()">
                <div v-if="getShowReviewerContentNotesItem(literatureItem)">
                  <p>
                    <strong>Reviewer's logs on article content</strong>
                  </p>

                  <p>
                    {{ literatureItem[config.LIT_CSV_KEYS.CONTENT_NOTES] }}
                  </p>
                </div>

                <div
                  v-if="
                    getShowReviewerContentNotesItem(literatureItem) &&
                    getShowReviewerProcessNotesItem(literatureItem)
                  "
                  class="ion-margin-top"
                ></div>

                <div v-if="getShowReviewerProcessNotesItem(literatureItem)">
                  <p>
                    <strong>Reviewer's logs on reviewing process</strong>
                  </p>

                  <p>
                    {{ literatureItem[config.LIT_CSV_KEYS.PROCESS_NOTES] }}
                  </p>
                </div>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { Config } from "@/config";
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";
import ThemeButton from "@/components/ThemeButton.vue";
import { modalController } from "@ionic/vue";
import PinBoard from "@/components/pin-board/PinBoard.vue";
import OpenPinBoardButton from "@/components/pin-board/OpenPinBoardButton.vue";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApps } from "firebase/app";

export default {
  mixins: [],
  components: { OpenPinBoardButton, ThemeButton },
  data() {
    return {
      comments: {},
      config: Config,
      moment: moment,
    };
  },
  computed: {
    ...mapGetters({
      getThemeReasoningKey: "themes/getThemeReasoningKey",
      getShowReviewerContentNotesItem:
        "literature/getShowReviewerContentNotesItem",
      getShowReviewerProcessNotesItem:
        "literature/getShowReviewerProcessNotesItem",
    }),
  },
  methods: {
    ...mapMutations({
      toggleTheme: "themes/toggleTheme",
    }),
    itemHasLogs() {
      return (
        this.getShowReviewerContentNotesItem(this.literatureItem) ||
        this.getShowReviewerProcessNotesItem(this.literatureItem)
      );
    },
    async openPinBoard(logId, logText) {
      const modal = await modalController.create({
        component: PinBoard,
        componentProps: {
          logId: logId,
          logText: logText,
          dbLogBookId: "themeLogbookComments",
        },
      });

      await modal.present();
    },
    getArticleLogId(literatureItem) {
      return (
        literatureItem["Article name"] +
        " - " +
        moment(literatureItem["date"]).format("MMMM YYYY")
      );
    },
    getNumComments(logId) {
      if (!this.comments || !logId || !(logId in this.comments)) {
        return null;
      }
      return Object.keys(this.comments[logId]).length;
    },
  },
  mounted() {
    const fireBaseIsInitialized = getApps().length > 0;
    if (fireBaseIsInitialized) {
      const db = getDatabase();
      const commentsRef = ref(db, "articleComments");
      onValue(commentsRef, (snapshot) => {
        this.comments = snapshot.val();
      });
    }
  },
  props: ["literatureItem"],
  inject: [],
  name: "LiteratureItem",
};
</script>

<style scoped>
ion-card-header {
  padding-bottom: 0.5rem;
}

a {
  color: #3880ff;
  text-decoration: none;
}

.thoughts-text-container {
  border-radius: 5px;
  background: aliceblue;
  padding: 16px;
}

ion-card-subtitle {
  margin-top: 8px;
  margin-bottom: 8px;
}

.border-right {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

ion-grid {
  padding: 0px;
}

ion-icon {
  margin-right: 4px;
  position: relative;
  top: 2px;
}

.literature-info-item {
  margin-right: 12px;
  display: inline-block;
  margin-top: 14px;
  margin-bottom: 0;
}

.open-pin-board-button {
  display: inline-block;
  position: relative;
  top: -5px;
  margin-right: 0.25rem;
}
</style>
