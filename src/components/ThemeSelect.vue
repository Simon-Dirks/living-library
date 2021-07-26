<template>
  <section>
    <h2>Themes</h2>
    <p v-if="numSelectedThemes > 0">
      <strong>
        Selected theme<span v-if="numSelectedThemes > 1">s</span> </strong
      >:
      <span
      >
        {{ selectedThemeIds.map((t) => getThemeTitle(t)).join(", ") }}
      </span>
    </p>
    <p v-else><em>No themes selected. Select a theme by clicking on an area in the image below.</em></p>

    <!-- <ion-range
      ref="timeslider"
      dual-knobs="true"
      min="1"
      max="10"
      step="1"
      snaps="true"
      pin="true"
    ></ion-range> -->

    <div class="theme-select-blobs-container">
      <img src="@/assets/img/blobs.png" usemap="#image-map" id="blobs-img" />

      <map name="image-map">
        <area
          target=""
          alt="equity"
          title="equity"
          href=""
          coords="996,512,870,575,734,763,573,903,326,912,157,1131,263,1320,588,1396,814,1381,1004,1158,1026,874,1066,633"
          shape="poly"
        />
        <area
          target=""
          alt="contextTeaching"
          title="contextTeaching"
          href=""
          coords="1800,524,1715,503,1722,402,1548,420,1343,521,1192,633,1089,799,1116,892,1034,969,879,955,697,892,665,1125,736,1271,923,1387,1142,1408,1487,1397,1693,1215,1816,865"
          shape="poly"
        />
        <area
          target=""
          alt="affect"
          title="affect"
          href=""
          coords="177,1032,133,861,231,577,434,492,594,505,1038,889,967,1226,570,1249,263,1146"
          shape="poly"
        />
        <area
          target=""
          alt="academicAchievementAssessment"
          title="academicAchievementAssessment"
          href=""
          coords="1288,335,717,1,170,76,12,346,67,611,581,810,1053,897,1196,767,1294,513"
          shape="poly"
        />
        <area
          target=""
          alt="teachingPractice"
          title="teachingPractice"
          href=""
          coords="1718,190,1198,66,904,56,583,243,477,461,546,731,678,861,1036,916,1174,860,1248,701,1429,689,1675,595,1725,376"
          shape="poly"
        />
      </map>
    </div>

    <div class="theme-select-buttons-container ion-margin-top" v-if="false">
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
    // this.$refs.timeslider.value = { lower: 1, upper: 3 };

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