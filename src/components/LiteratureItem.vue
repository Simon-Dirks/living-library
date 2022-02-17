<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ literatureItem["Article name"] }}</ion-card-title>
      <ion-card-subtitle v-if="literatureItem[config.CSV_KEYS.SUMMARY]">
        {{ literatureItem[config.CSV_KEYS.SUMMARY] }}
      </ion-card-subtitle>
      <br />
      <ion-chip
        @click="toggleTheme(themeId)"
        :style="{
          '--background': getThemeChipColor(themeId),
        }"
        v-for="themeId in literatureItem['themes']"
        :key="themeId"
      >
        <ion-label color="secondary"
          ><strong v-if="isThemeSelected(themeId)" style="color: white">
            {{ getThemeTitle(themeId) }}</strong
          >
          <template v-else>{{ getThemeTitle(themeId) }}</template>
        </ion-label>

        <ion-icon
          name="information-circle"
          @click.stop="openThemeInfoPopup(themeId)"
          :style="{
            color: isThemeSelected(themeId) ? 'white' : 'darkslategrey',
          }"
        ></ion-icon>
      </ion-chip>
    </ion-card-header>
    <ion-card-content>
      <p>
        <a :href="literatureItem[config.CSV_KEYS.ARTICLE_LINK]" target="_blank">
          <ion-icon class="ion-margin-end" name="link" />
          <span v-if="literatureItem[config.CSV_KEYS.AUTHORS]">
            {{ literatureItem[config.CSV_KEYS.AUTHORS] }}</span
          ><span v-else>Article link</span>
        </a>
      </p>

      <p>
        <ion-icon class="ion-margin-end" name="book" />
        <span>{{ literatureItem[config.CSV_KEYS.JOURNAL] }}</span>
      </p>

      <p>
        <ion-icon class="ion-margin-end" name="calendar" />
        <span>{{
          moment(literatureItem["date"]).format("MMMM DD, YYYY")
        }}</span>
      </p>

      <p v-if="literatureItem[config.CSV_KEYS.COUNTRY]">
        <ion-icon class="ion-margin-end" name="globe" />
        <span>{{ literatureItem[config.CSV_KEYS.COUNTRY] }}</span>
      </p>

      <div
        v-if="
          getShowReviewerContentNotesItem(literatureItem) ||
          getShowReviewerProcessNotesItem(literatureItem)
        "
        class="thoughts-text-container"
      >
        <div v-if="getShowReviewerContentNotesItem(literatureItem)">
          <p>
            <strong>Reviewer's thoughts and discussion points</strong>
          </p>

          <p>
            {{ literatureItem[config.CSV_KEYS.CONTENT_NOTES] }}
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
            <strong>Reviewer's notes and doubts</strong>
          </p>

          <p>
            {{ literatureItem[config.CSV_KEYS.PROCESS_NOTES] }}
          </p>
        </div>
      </div>

      <!--      <p>-->
      <!--        <ion-icon class="ion-margin-end" name="calendar" />-->
      <!--        <span>Date of coding: {{ literatureItem[config.CSV_KEYS.DATE_OF_CODING] }}</span>-->
      <!--      </p>-->

      <!--      <p v-if="literatureItem[config.CSV_KEYS.CODED_BY]">-->
      <!--        <small>-->
      <!--          <em-->
      <!--            >Coded by: {{ literatureItem[config.CSV_KEYS.CODED_BY] }}-->
      <!--            <span v-if="literatureItem[config.CSV_KEYS.DATE_OF_CODING]">-->
      <!--              ({{ literatureItem[config.CSV_KEYS.DATE_OF_CODING] }})-->
      <!--            </span>-->
      <!--          </em>-->
      <!--        </small>-->
      <!--      </p>-->
    </ion-card-content>
  </ion-card>
</template>

<script>
import { modalController } from "@ionic/vue";
import Config from "@/config.js";
import { mapGetters, mapMutations } from "vuex";
import ThemeInfoPopup from "@/components/popups/ThemeInfoPopup";
import moment from "moment";

export default {
  mixins: [],
  components: {},
  data() {
    return {
      config: Config,
      moment: moment,
    };
  },
  computed: {
    ...mapGetters({
      isThemeSelected: "themes/isThemeSelected",
      getThemeReasoningKey: "themes/getThemeReasoningKey",
      getThemeTitle: "themes/getThemeTitle",
      getThemeColor: "themes/getThemeColor",
      getThemeData: "themes/getThemeData",
      getThemeChipColor: "themes/getThemeChipColor",
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
    async openThemeInfoPopup(themeId) {
      const themeReasoning =
        this.literatureItem[this.getThemeReasoningKey(themeId)];
      const modal = await modalController.create({
        component: ThemeInfoPopup,
        componentProps: {
          themeData: this.getThemeData(themeId),
          themeReasoning: themeReasoning,
        },
      });

      await modal.present();
      await modal.onDidDismiss();
    },
  },
  props: ["literatureItem"],
  inject: [],
  name: "LiteratureItem",
};
</script>

<style scoped>
a {
  color: #3880ff;
  text-decoration: none;
}

.thoughts-text-container {
  border-radius: 5px;
  background: aliceblue;
  padding: 16px;
  margin-top: 16px;
}
</style>
