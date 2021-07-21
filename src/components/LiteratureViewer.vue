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
          <ion-card-subtitle v-if="literatureItem.Authors">
            Authors: {{ literatureItem.Authors }}</ion-card-subtitle
          >
        </ion-card-header>
        <ion-card-content>
          <p>
            Themes:
            <span
              class="article-theme"
              v-for="themeId in literatureItem['Theme.FINDINGS']"
              :key="themeId"
            >
              <strong v-if="themeIsSelected(themeId)"> {{ themeId }}</strong
              ><template v-else>{{ themeId }}</template>
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
import rawLiteratureData from "@/assets/data/coded-articles.csv";
import Papa from "papaparse";

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
} from "@ionic/vue";

export default {
  inject: ["selectedThemeIds", "themeIsSelected"],
  name: "LiteratureViewer",
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
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
          if (literatureItem[themeKey] === "") {
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
.article-theme {
  margin-right: 5px;
}
</style>