<template>
  <section>
    <h2>Themes</h2>
    <p v-if="numSelectedThemes > 0">
      <strong>
        Selected theme<span v-if="numSelectedThemes > 1">s</span> </strong
      >:
      <span
        class="ion-margin-end"
        v-for="selectedThemeId in selectedThemeIds"
        :key="selectedThemeId"
      >
        {{ getThemeTitle(selectedThemeId) }}
      </span>
    </p>
    <p v-else><em>No themes selected.</em></p>

    <div class="theme-select-blobs-container">
      <img src="@/assets/img/blobs.png" usemap="#image-map" id="blobs-img" />

      <map name="image-map">
        <area
          target="_blank"
          alt="them.AFF"
          title="them.AFF"
          href="#"
          coords="159,683,133,755,130,812,135,876,138,919,132,948,145,985,154,1030,172,1038,190,1009,217,988,247,963,278,938,305,919,350,908,397,906,471,908,530,914,557,903,606,876,652,855,628,823,561,828,451,812,345,779,251,749"
          shape="poly"
        />
        <area
          target="_blank"
          alt="intersect_them.TPD_them.TEC"
          title="intersect_them.TPD_them.TEC"
          href="#"
          coords="1182,712,1380,693,1555,662,1669,625,1682,566,1706,511,1722,476,1723,396,1649,359,1584,418,1503,449,1386,489,1322,518,1311,550,1290,592,1233,669"
          shape="poly"
        />

        <area
          target="_blank"
          alt="them.EQU"
          title="them.EQU"
          href="#"
          coords="177,1046,215,1081,279,1137,353,1176,443,1218,509,1229,548,1256,654,1261,716,1266,784,1316,856,1351,848,1366,764,1386,636,1407,498,1391,342,1359,233,1298,183,1231,161,1110"
          shape="poly"
        />
        <area
          target="_blank"
          alt="intersect_them.AFF_them.EQU"
          title="intersect_them.AFF_them.EQU"
          href=""
          coords="703,892,671,861,634,861,551,908,531,927,501,916,411,909,345,909,257,949,189,1015,170,1044,233,1100,302,1150,366,1184,406,1202,459,1224,515,1235,544,1256,592,1256,657,1261,703,1264,727,1279,715,1256,698,1242,675,1187,668,1068,667,957"
          shape="poly"
        />
      </map>
    </div>

    <ion-range
      ref="timeslider"
      dual-knobs="true"
      min="1"
      max="10"
      step="1"
      snaps="true"
      pin="true"
    ></ion-range>

    <div class="theme-select-buttons-container ion-margin-top">
      <div
        class="theme-select-button-container"
        v-for="themeId in getAllPossibleThemeIds()"
        :key="themeId"
      >
        <button @click="selectTheme(themeId)">
          {{ getThemeTitle(themeId) }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import "imagemapster";

export default {
  name: "ThemeSelect",
  computed: {
    numSelectedThemes() {
      return this.selectedThemeIds.length;
    },
  },
  data() {
    return {};
  },
  watch: {
    selectedThemeIds: {
      handler: function (newThemes, prevThemes) {
        console.log("Selected themes updated: ", newThemes);
        $("area").each((index, area) => {
          const themeId = $(area).attr("name");
          const isSelected = newThemes.includes(themeId);
          $(area).mapster("set", isSelected);
        });
      },
      deep: true,
    },
  },
  inject: ["selectedThemeIds", "selectTheme", "getThemeTitle", "THEMES"],
  methods: {
    // https://stackoverflow.com/questions/60304208/javascript-algorithm-to-generate-all-possible-unique-combinations-of-any-length
    getAllCombinations(array) {
      function iter(temp, index) {
        if (index >= array.length) {
          result.push(temp);
          return;
        }

        iter([...temp, array[index]], index + 1);
        iter(temp, index + 1);
      }

      var result = [];
      iter([], 0);
      return result;
    },
    getAllPossibleThemeIds() {
      let themeIdCombinations = this.getAllCombinations(
        Object.keys(this.THEMES)
      );

      themeIdCombinations = themeIdCombinations
        .filter((themeIds) => themeIds.length !== 0)
        .map((themeIds) =>
          themeIds.length === 1
            ? themeIds[0]
            : "intersect_" + themeIds.join("_")
        );
      return themeIdCombinations;
    },
  },
  mounted() {
    this.$refs.timeslider.value = { lower: 1, upper: 3 };

    $(document).ready(() => {
      $("area").each((index, area) => {
        const themeId = $(area).attr("title");
        const themeTitle = this.getThemeTitle(themeId);
        $(area)
          .attr("title", themeTitle)
          .attr("alt", themeTitle)
          .attr("name", themeId);
      });

      setTimeout(() => {
        $("img[usemap]").mapster({
          stroke: true,
          strokeWidth: 2.5,
          strokeColor: "000000",
          strokeOpacity: 0.3,
          fill: true,
          fillColor: "000000",
          fillOpacity: 0.2,
          onClick: (e) => {
            const themeId = e.key;
            this.selectTheme(themeId);
            return false;
          },
          mapKey: "name",
          listKey: "name",
        });
      }, 100);
    });
  },
};
</script>

<style scoped>
#blobs-img {
  width: 100%;
  max-width: 500px;
}
</style>