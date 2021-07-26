<template>
  <ion-content>
    <h2>Literature ({{ shownLiteratureData.length }})</h2>

    <template
      v-for="literatureItem in shownLiteratureData"
      :key="literatureItem['Article name']"
    >
      <literature-item :literatureItem="literatureItem"></literature-item>
    </template>
  </ion-content>
</template>

<script>
import LiteratureItem from "./LiteratureItem.vue";
import rawLiteratureData from "@/assets/data/coded-articles-v2.csv";
import Papa from "papaparse";
import { IonContent } from "@ionic/vue";

export default {
  inject: [
    "selectedThemeIds",
    "themeIsSelected",
    "getThemeTitle",
    "getIntersectionThemes",
  ],
  name: "LiteratureViewer",
  components: {
    IonContent,
    LiteratureItem,
  },
  data() {
    return {
      literatureData: [],
    };
  },
  computed: {
    shownLiteratureData() {
      const noThemesSelected = this.selectedThemeIds.length === 0;
      if (noThemesSelected) {
        return this.literatureData;
      }
      const shownLiteratureData = this.literatureData.filter(
        (item) => this.getNumSelectedThemesForLiteratureItem(item) > 0
      );
      shownLiteratureData.sort((firstItem, secondItem) => {
        return (
          this.getNumSelectedThemesForLiteratureItem(secondItem) -
          this.getNumSelectedThemesForLiteratureItem(firstItem)
        );
      });

      return shownLiteratureData;
    },
  },
  methods: {
    getNumSelectedThemesForLiteratureItem(literatureItem) {
      let numSelectedThemesForLiteratureItem = 0;
      const literatureItemThemes = literatureItem["Theme.FINDINGS"];
      for (const selectedThemeId of this.selectedThemeIds) {
        const selectedIntersectionThemes =
          this.getIntersectionThemes(selectedThemeId);
        if (selectedIntersectionThemes) {
          const literatureItemMatchesIntersectionThemes =
            selectedIntersectionThemes.every((themeId) =>
              literatureItemThemes.includes(themeId)
            );
          if (literatureItemMatchesIntersectionThemes) {
            numSelectedThemesForLiteratureItem++;
          }
        } else {
          const literatureItemMatchesSelectedTheme =
            literatureItemThemes.includes(selectedThemeId);
          if (literatureItemMatchesSelectedTheme) {
            numSelectedThemesForLiteratureItem++;
          }
        }
      }

      return numSelectedThemesForLiteratureItem;
    },
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
      }
    },
  },
  mounted() {
    this.loadLiteratureFromFile();
  },
};
</script>

<style scoped>
</style>