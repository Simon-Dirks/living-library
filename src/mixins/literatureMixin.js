import Papa from "papaparse";
import { themeMixin } from "@/mixins/themeMixin";
import Config from "@/config.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import fileLiteratureData from "@/assets/data/coded-articles.csv";

export const literatureMixin = {
  mixins: [themeMixin],
  data() {
    return {
      literatureData: [],
      loadingLiteratureData: false,
      shownKeys: new Set(Object.values(Config.CSV_FILTER_KEYS)),
      shownEducationKeys: new Set(
        Object.values(Config.CSV_EDUCATION_FILTER_KEYS)
      ),
    };
  },
  computed: {
    literatureMixin_shown() {
      let shownLiteratureData = this.literatureData;

      shownLiteratureData = this.literatureData.filter(
        (item) =>
          !item.date ||
          (item.date <= new Date(this.getTimeFilter().max) &&
            item.date >= new Date(this.getTimeFilter().min))
      );

      shownLiteratureData = shownLiteratureData.filter((item) => {
        for (const shownKey of this.shownKeys) {
          const itemShouldBeShown = item[shownKey];
          if (itemShouldBeShown) {
            return true;
          }
        }
        return false;
      });

      // TODO: Refactor redundant/duplicated code
      shownLiteratureData = shownLiteratureData.filter((item) => {
        for (const shownKey of this.shownEducationKeys) {
          const itemShouldBeShown = item[shownKey];
          if (itemShouldBeShown) {
            return true;
          }
        }
        return false;
      });

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
  created() {
    this.$_literatureMixin_loadLiterature();
  },
  methods: {
    literatureMixin_toggleFilter(filterKey, showThisKey) {
      if (showThisKey) {
        this.shownKeys.add(filterKey);
      } else {
        this.shownKeys.delete(filterKey);
      }

      console.log("LIT FILTER:", this.shownKeys);
    },

    // TODO: Refactor duplicated code
    literatureMixin_toggleEducationFilter(filterKey, showThisKey) {
      if (showThisKey) {
        this.shownEducationKeys.add(filterKey);
      } else {
        this.shownEducationKeys.delete(filterKey);
      }

      console.log("EDUCATION FILTER:", this.shownEducationKeys);
    },

    async $_literatureMixin_loadLiterature() {
      this.loadingLiteratureData = true;

      console.log("Loading literature...");
      const codedArticles = await getCodedArticlesCsvFile();
      this.literatureData = Papa.parse(codedArticles, {
        header: true,
        dynamicTyping: true,
      }).data;

      this.literatureData = this.literatureData.filter(
        (item) =>
          item[Config.CSV_KEYS.ARTICLE_NAME] &&
          item[Config.CSV_KEYS.ARTICLE_NAME] !== ""
      );

      for (const literatureItem of this.literatureData) {
        // console.log("Parsing", literatureItem["Article name"]);
        literatureItem["themes"] = [];
        literatureItem["year"] = null;

        if (literatureItem[Config.CSV_KEYS.DATE]) {
          literatureItem["date"] = getDateFromLiteratureItem(literatureItem);

          // literatureItem[Config.CSV_KEYS.DATE_OF_CODING] = new Date(
          //   literatureItem[Config.CSV_KEYS.DATE_OF_CODING]
          // );
        }

        const countryConductedRaw = literatureItem[Config.CSV_KEYS.COUNTRY];
        if (countryConductedRaw) {
          literatureItem[Config.CSV_KEYS.COUNTRY] = countryConductedRaw
            .split(";")
            .join(", ");
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

      console.log("Literature loaded!", this.literatureData);

      this.loadingLiteratureData = false;
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

async function getCodedArticlesCsvFile() {
  if (Config.DEBUG_MODE) {
    return Promise.resolve(fileLiteratureData);
  }

  const storage = getStorage();
  const codedArticlesStorageRef = ref(
    storage,
    Config.STORAGE_URL + Config.ARTICLES_CSV_FILENAME
  );
  const url = await getDownloadURL(codedArticlesStorageRef).catch((error) => {
    return Promise.reject(error);
  });

  console.log("Downloading coded articles file...", url);

  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = async (event) => {
      const blob = xhr.response;
      console.log("Downloaded coded articles file!");
      const blobText = await blob.text();
      return resolve(blobText);
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.open("GET", url);
    xhr.send();
  });
}
