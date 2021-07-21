<template>
  <ion-content>
    <h2>Literature</h2>

    <template
      v-for="literatureItem in literatureData"
      :key="literatureItem['Article name']"
    >
      <literature-item
        v-if="literatureItemIsVisible(literatureItem)"
        :literatureItem="literatureItem"
      ></literature-item>
    </template>
  </ion-content>
</template>

<script>
// import rawLiteratureData from "../assets/data/literature.json";
import LiteratureItem from "./LiteratureItem.vue";
import rawLiteratureData from "@/assets/data/coded-articles-v2.csv";
import Papa from "papaparse";
import { IonContent } from "@ionic/vue";

export default {
  inject: ["selectedThemeIds", "themeIsSelected", "getThemeTitle"],
  name: "LiteratureViewer",
  components: {
    IonContent,
    LiteratureItem,
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

    literatureItemIsVisible(literatureItem) {
      const noThemesSelected = this.selectedThemeIds.length === 0;
      if (noThemesSelected) {
        return true;
      }

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
</style>