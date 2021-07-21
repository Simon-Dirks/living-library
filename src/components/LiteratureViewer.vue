<template>
  <ion-content>
    <h2>Literature</h2>

    <template
      v-for="literatureItem in literatureData"
      :key="literatureItem['Article name']"
    >
      <ion-card v-if="literatureItemThemesAreSelected(literatureItem)">
        <ion-card-header>
          <ion-card-title>{{ literatureItem["Article name"] }}</ion-card-title>
          <ion-card-subtitle
            ><ion-icon class="ion-margin-end" name="book" />{{
              literatureItem["Journal"]
            }}</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <p>
            <a :href="literatureItem['Article Link']" target="_blank"
              ><ion-icon class="ion-margin-end" name="link" />
              <span v-if="literatureItem.Authors">
                {{ literatureItem.Authors }}</span
              ><span v-else>Article link</span>
            </a>
          </p>

          <p>
            <ion-icon name="bulb" />
            <span
              class="ion-margin-start"
              v-for="themeId in literatureItem['Theme.FINDINGS']"
              :key="themeId"
            >
              <strong v-if="themeIsSelected(themeId)">
                {{ getThemeTitle(themeId) }}</strong
              ><template v-else>{{ getThemeTitle(themeId) }}</template>
            </span>
            <!-- <span v-html="literatureItem['Theme.FINDINGS'].join(', ')"></span> -->
          </p>
        </ion-card-content>
      </ion-card>
    </template>
  </ion-content>
</template>

<script>
// import rawLiteratureData from "../assets/data/literature.json";
import rawLiteratureData from "@/assets/data/coded-articles-v2.csv";
import Papa from "papaparse";

import {
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonContent,
} from "@ionic/vue";

export default {
  inject: ["selectedThemeIds", "themeIsSelected", "getThemeTitle"],
  name: "LiteratureViewer",
  components: {
    IonIcon,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  },
  data() {
    return {
      literatureData: null,
    };
  },
  methods: {
    loadLiteratureFromFile() {
      this.literatureData = Papa.parse(rawLiteratureData, {
        header: true,
      }).data;
      const themeKeys = [
        "Theme.FINDINGS",
        "Subtheme.FINDINGS",
        "Theme.IMPLICATIONS",
        "Subtheme.IMPLICATIONS",
      ];
      for (const literatureItem of this.literatureData) {
        for (const themeKey of themeKeys) {
          if (!literatureItem[themeKey] || literatureItem[themeKey] === "") {
            literatureItem[themeKey] = [];
            continue;
          }
          literatureItem[themeKey] = literatureItem[themeKey].split(";");
        }
        // console.log(literatureItem);
      }
      console.log(this.literatureData);
    },

    literatureItemThemesAreSelected(literatureItem) {
      return (
        literatureItem["Theme.FINDINGS"].filter((theme) =>
          this.selectedThemeIds.includes(theme)
        ).length > 0
      );
    },
  },
  mounted() {
    this.loadLiteratureFromFile();
  },
};
</script>

<style scoped>
a {
  color: #3880ff;
  text-decoration: none;
}
</style>