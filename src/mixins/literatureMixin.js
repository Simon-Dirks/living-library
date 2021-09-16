import Papa from "papaparse";
import rawLiteratureData from "@/assets/data/coded-articles_v2.csv";
import { themeMixin } from "@/mixins/themeMixin";
import Config from "@/config.js";

let literatureData = [];

export const literatureMixin = {
  mixins: [themeMixin],
  data() {
    return {};
  },
  created() {
    this.$_literatureMixin_loadFromFile();
  },
  computed: {
    shownLiteratureData() {
      let shownLiteratureData = literatureData;

      shownLiteratureData = literatureData.filter(
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
          this.$_literatureMixin_getNumSelectedThemesForItem(item) ===
          this.getSelectedThemeIds().length
      );

      shownLiteratureData.sort((firstItem, secondItem) => {
        return (
          this.$_literatureMixin_getNumSelectedThemesForItem(secondItem) -
          this.$_literatureMixin_getNumSelectedThemesForItem(firstItem)
        );
      });

      return shownLiteratureData;
    },
  },
  methods: {
    $_literatureMixin_loadFromFile() {
      console.log("Loading literature from file...");
      literatureData = Papa.parse(rawLiteratureData, {
        header: true,
      }).data;
      literatureData = literatureData.filter(
        (item) =>
          item[Config.CSV_KEYS.ARTICLE_NAME] &&
          item[Config.CSV_KEYS.ARTICLE_NAME] !== ""
      );

      for (const literatureItem of literatureData) {
        // console.log("Parsing", literatureItem["Article name"]);
        literatureItem["themes"] = [];
        literatureItem["year"] = null;

        if (literatureItem[Config.CSV_KEYS.DATE]) {
          literatureItem["date"] = getDateFromLiteratureItem(literatureItem);

          literatureItem["dateOfCoding"] = new Date(
            literatureItem[Config.CSV_KEYS.DATE_OF_CODING]
          );
        }

        for (const themeKey of Config.CSV_KEYS.THEMES) {
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
              Config.IGNORED_THEMES.includes(literatureItemTheme);
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
      // console.dir(literatureData);
    },
    $_literatureMixin_getNumSelectedThemesForItem(literatureItem) {
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

function getDateFromLiteratureItem(literatureItem) {
  let itemYear = literatureItem[Config.CSV_KEYS.DATE].replace(/\D/g, "");
  let itemMonth = literatureItem[Config.CSV_KEYS.DATE]
    .replace("date.", "")
    .replace(itemYear, "");
  const itemMonthStartsWithR = itemMonth[0].toLowerCase() === "r";
  if (itemMonthStartsWithR) {
    itemMonth = itemMonth.substring(1);
  }
  itemYear = "20" + itemYear;
  return new Date(itemMonth + " " + itemYear);
}
