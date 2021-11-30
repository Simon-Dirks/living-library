<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ literatureItem["Article name"] }}</ion-card-title>
      <ion-card-subtitle v-if="literatureItem[config.CSV_KEYS.SUMMARY]">
        {{ literatureItem[config.CSV_KEYS.SUMMARY] }}
      </ion-card-subtitle>
      <br />
      <ion-chip
        @click="selectTheme(themeId)"
        :style="{
          '--background': getThemeChipColor(themeId),
        }"
        v-for="themeId in literatureItem['themes']"
        :key="themeId"
      >
        <ion-label color="secondary"
          ><strong v-if="themeIsSelected(themeId)" style="color: white">
            {{ getThemeTitle(themeId) }}</strong
          >
          <template v-else>{{ getThemeTitle(themeId) }}</template>
        </ion-label>

        <ion-icon
          name="information-circle"
          @click.stop="openThemeInfoPopup(themeId)"
          :style="{
            color: themeIsSelected(themeId) ? 'white' : 'darkslategrey',
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
        {{ literatureItem[config.CSV_KEYS.JOURNAL] }}
      </p>

      <p>
        <ion-icon class="ion-margin-end" name="calendar" />
        {{ timestampToDate(literatureItem["date"]) }}
      </p>

      <!--      <p>-->
      <!--        Date of coding: {{ literatureItem[config.CSV_KEYS.DATE_OF_CODING] }}-->
      <!--      </p>-->
    </ion-card-content>
  </ion-card>
</template>

<script>
import { modalController } from "@ionic/vue";
import { dateMixin } from "@/mixins/dateMixin";
import ThemeInfoPopup from "@/components/ThemeInfoPopup";
import { themeMixin } from "@/mixins/themeMixin";
import Config from "@/config.js";

export default {
  mixins: [dateMixin, themeMixin],
  components: {},
  data() {
    return {
      config: Config,
    };
  },
  methods: {
    getThemeChipColor(themeId) {
      return this.themeIsSelected(themeId)
        ? this.getThemeColor(themeId)
        : this.getThemeColor(themeId, 0.3);
    },
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
      const modalResponse = await modal.onDidDismiss();
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
</style>
