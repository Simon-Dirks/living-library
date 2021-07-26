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
import { dateMixin } from "../mixins/dateMixin";

export default {
  mixins: [dateMixin],
  inject: [
    "selectedThemeIds",
    "themeIsSelected",
    "getThemeTitle",
    "getIntersectionThemes",
    "THEMES",
    "getTimeFilter",
  ],
  name: "LiteratureViewer",
  components: {
    IonContent,
    LiteratureItem,
  },
  data() {
    return {
      literatureData: [],
      ignoredThemes: ["them.TEC", "them.OTH"],
    };
  },
  computed: {
    shownLiteratureData() {
      let shownLiteratureData = this.literatureData;

      shownLiteratureData = this.literatureData.filter(
        (item) =>
          !item.date ||
          (item.date <= new Date(this.getTimeFilter().max) &&
            item.date >= new Date(this.getTimeFilter().min))
      );

      const noThemesSelected = this.selectedThemeIds.length === 0;
      if (noThemesSelected) {
        return shownLiteratureData;
      }
      shownLiteratureData = shownLiteratureData.filter(
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
      const literatureItemThemes = literatureItem["themes"];
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
      this.literatureData = this.literatureData.filter(
        (item) => item["Article name"] && item["Article name"] !== ""
      );
      const themeKeys = ["Theme.FINDINGS", "Theme.IMPLICATIONS"];
      for (const literatureItem of this.literatureData) {
        literatureItem["themes"] = [];
        literatureItem["year"] = null;
        if (literatureItem.Date) {
          let itemYear = literatureItem.Date.replace(/\D/g, "");
          let itemMonth = literatureItem.Date.replace("date.", "").replace(
            itemYear,
            ""
          );
          const itemMonthStartsWithR = itemMonth[0].toLowerCase() === "r";
          if (itemMonthStartsWithR) {
            itemMonth = itemMonth.substring(1);
          }
          itemYear = "20" + itemYear;
          literatureItem["date"] = new Date(itemMonth + " " + itemYear);
        }

        for (const themeKey of themeKeys) {
          if (!literatureItem[themeKey] || literatureItem[themeKey] === "") {
            continue;
          }

          const literatureItemThemes = literatureItem[themeKey].split(";");
          for (const literatureItemTheme of literatureItemThemes) {
            if (
              literatureItemTheme === "" ||
              this.ignoredThemes.includes(literatureItemTheme)
            ) {
              continue;
            }

            const highlevelTheme =
              this.getHighlevelThemeId(literatureItemTheme);
            const themeNotYetSaved =
              !literatureItem["themes"].includes(highlevelTheme);
            if (themeNotYetSaved) {
              literatureItem["themes"].push(highlevelTheme);
            }
          }
        }
      }

      console.dir(this.literatureData);
    },
    getHighlevelThemeId(rawThemeId) {
      for (const [themeId, theme] of Object.entries(this.THEMES)) {
        if (theme.themes.includes(rawThemeId)) {
          return themeId;
        }
      }

      return rawThemeId;
    },
  },
  mounted() {
    this.loadLiteratureFromFile();
  },
};
</script>

<style scoped>
</style>