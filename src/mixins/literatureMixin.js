import Papa from "papaparse";
import rawLiteratureData from "@/assets/data/coded-articles.csv";
import { themeMixin } from "@/mixins/themeMixin";

export const literatureMixin = {
  mixins: [themeMixin],
  data() {
    return {
      literatureData: [],
      ignoredThemes: ["them.TEC", "them.OTH"],
      THEME_KEYS: ["Theme.FINDINGS", "Theme.IMPLICATIONS"],
    };
  },
  created() {
    this.loadLiteratureFromFile();
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

      const noThemesSelected = this.getSelectedThemeIds().length === 0;
      if (noThemesSelected) {
        return shownLiteratureData;
      }

      // Show literature tagged with (at least) one of the selected themes
      // shownLiteratureData = shownLiteratureData.filter(
      //   (item) => this.getNumSelectedThemesForLiteratureItem(item) > 0
      // );

      // Show literature tagged with ALL of the selected themes
      shownLiteratureData = shownLiteratureData.filter(
        (item) =>
          this.getNumSelectedThemesForLiteratureItem(item) ===
          this.getSelectedThemeIds().length
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
    loadLiteratureFromFile() {
      console.log("Loading literature from file...");
      this.literatureData = Papa.parse(rawLiteratureData, {
        header: true,
      }).data;

      this.literatureData = this.literatureData.filter(
        (item) => item["Article name"] && item["Article name"] !== ""
      );

      for (const literatureItem of this.literatureData) {
        // console.log("Parsing", literatureItem["Article name"]);
        literatureItem["themes"] = [];
        literatureItem["year"] = null;

        if (literatureItem.Date) {
          literatureItem["date"] =
            this.getDateFromLiteratureItem(literatureItem);

          literatureItem["dateOfCoding"] = new Date(
            literatureItem["dateOfCoding"]
          );
        }

        for (const themeKey of this.THEME_KEYS) {
          if (!literatureItem[themeKey] || literatureItem[themeKey] === "") {
            // console.warn(
            //   "Could not find themes for article:",
            //   literatureItem["Article name"]
            // );
            continue;
          }

          const literatureItemThemes = literatureItem[themeKey].split(";");
          for (const literatureItemTheme of literatureItemThemes) {
            const hasValidTheme = literatureItemTheme !== "";
            const isIgnoredTheme =
              this.ignoredThemes.includes(literatureItemTheme);
            if (!hasValidTheme || isIgnoredTheme) {
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

      console.log("Literature loaded!");
      // console.dir(this.literatureData);
    },
    getDateFromLiteratureItem(literatureItem) {
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
      return new Date(itemMonth + " " + itemYear);
    },
    getNumSelectedThemesForLiteratureItem(literatureItem) {
      let numSelectedThemesForLiteratureItem = 0;
      const literatureItemThemes = literatureItem["themes"];
      for (const selectedThemeId of this.getSelectedThemeIds()) {
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
  },
};
