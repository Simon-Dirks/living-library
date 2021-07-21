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

    <!-- <div id="theme-blobs-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 478 451">
        <path
          d="M368.9 120.5c-1 6.7-2.2 13.7-3.8 20.8 8.9 12.6 17.5 26 25.6 40.2 19.3 33.5 34 67.1 43.9 98.6 18.6-9.7 31-22.9 35-39 9.8-39.1-31.7-85.4-100.7-120.6zM153.4 133c-3.5-25.3-3-47.8 1.8-65.8C77.8 65.9 19.4 87.3 9.7 126.3c-9.1 36.4 26.5 79.2 87.4 113.4 9.1-23.6 20.6-47.9 34.7-72.2 6.9-12.1 14.1-23.6 21.6-34.5z"
          opacity=".5"
          fill="#00d9ea"
        />
        <path
          d="M338 106.2c10.8 4.5 21.1 9.3 30.9 14.2 7.3-50.9-1.6-90.7-28.1-106.1-23.4-13.5-56.4-5.7-91.6 18.2 28.3 13.6 59.4 39.2 88.8 73.7zM208.4 283.5c-42-11-80-26.3-111.3-43.9-33.3 86.5-32.6 162.6 6.7 185.3 36.6 21.1 96.4-9.9 151.6-72.4-16-19.8-31.5-42.1-45.6-66.6-.5-.8-1-1.6-1.4-2.4z"
          opacity=".5"
          fill="#00e83c"
        />
        <path
          d="M153.4 133c-7.5 10.9-14.7 22.4-21.7 34.4-14 24.3-25.6 48.6-34.7 72.2 31.3 17.6 69.2 32.9 111.3 43.9-30.1-52.9-48.7-106-54.9-150.5z"
          opacity=".5"
          fill="#00d9ea"
        />
        <path
          d="M153.4 133c-7.5 10.9-14.7 22.4-21.7 34.4-14 24.3-25.6 48.6-34.7 72.2 31.3 17.6 69.2 32.9 111.3 43.9-30.1-52.9-48.7-106-54.9-150.5z"
          opacity=".5"
          fill="#00e83c"
        />
        <path
          d="M365.1 141.3c1.5-7.1 2.8-14 3.8-20.8-9.8-5-20.1-9.8-30.9-14.2 9.3 10.8 18.4 22.5 27.1 35z"
          opacity=".5"
          fill="#00d9ea"
        />
        <path
          d="M365.1 141.3c1.5-7.1 2.8-14 3.8-20.8-9.8-5-20.1-9.8-30.9-14.2 9.3 10.8 18.4 22.5 27.1 35z"
          opacity=".5"
          fill="#00e83c"
        />
        <path
          d="M249.2 32.6c-25.9-12.3-49.5-14.5-67.4-4.2-13.1 7.5-21.8 21-26.5 38.7 15.6.3 32 1.4 48.9 3.6 15-15.2 30.2-28.1 45-38.1zm47.1 266.1c-13 19.8-26.8 37.8-40.9 53.8 58.2 71.8 124.2 109 163.4 86.4 35.2-20.3 39.4-83.6 15.9-158.9-31.6 16.6-81.2 23.4-138.4 18.7z"
          opacity=".5"
          fill="#ff9a22"
        />
        <path
          d="M153.4 133c16.1-23.6 33.3-44.5 50.7-62.2-16.9-2.1-33.3-3.3-48.9-3.6-4.7 18-5.3 40.5-1.8 65.8z"
          opacity=".5"
          fill="#00d9ea"
        />
        <path
          d="M153.4 133c16.1-23.6 33.3-44.5 50.7-62.2-16.9-2.1-33.3-3.3-48.9-3.6-4.7 18-5.3 40.5-1.8 65.8z"
          opacity=".5"
          fill="#ff9a22"
        />
        <path
          d="M365.1 141.3c-8.7 40.2-26.3 85.6-52.4 130.7-5.3 9.2-10.9 18.2-16.5 26.8 57.3 4.7 106.8-2.1 138.4-18.7-9.9-31.5-24.6-65.1-43.9-98.6-8.1-14.2-16.7-27.6-25.6-40.2z"
          opacity=".5"
          fill="#00d9ea"
        />
        <path
          d="M365.1 141.3c-8.7 40.2-26.3 85.6-52.4 130.7-5.3 9.2-10.9 18.2-16.5 26.8 57.3 4.7 106.8-2.1 138.4-18.7-9.9-31.5-24.6-65.1-43.9-98.6-8.1-14.2-16.7-27.6-25.6-40.2z"
          opacity=".5"
          fill="#ff9a22"
        />
        <path
          d="M204.1 70.8c19.7 2.5 40.1 6.3 60.8 11.5 26 6.5 50.6 14.7 73.1 24-29.5-34.5-60.5-60.2-88.9-73.6-14.7 9.9-29.9 22.8-45 38.1z"
          opacity=".5"
          fill="#00e83c"
        />
        <path
          d="M204.1 70.8c19.7 2.5 40.1 6.3 60.8 11.5 26 6.5 50.6 14.7 73.1 24-29.5-34.5-60.5-60.2-88.9-73.6-14.7 9.9-29.9 22.8-45 38.1z"
          opacity=".5"
          fill="#ff9a22"
        />
        <path
          d="M214.4 285l-6-1.5c.5.8.9 1.6 1.4 2.4 14.1 24.5 29.6 46.8 45.6 66.6 14.1-16 27.9-34 40.9-53.8-26.1-2.1-53.7-6.6-81.9-13.7z"
          opacity=".5"
          fill="#00e83c"
        />
        <path
          d="M214.4 285l-6-1.5c.5.8.9 1.6 1.4 2.4 14.1 24.5 29.6 46.8 45.6 66.6 14.1-16 27.9-34 40.9-53.8-26.1-2.1-53.7-6.6-81.9-13.7z"
          opacity=".5"
          fill="#ff9a22"
        />
        <path
          d="M265 82.2c-20.7-5.2-41.2-9-60.8-11.5-17.4 17.7-34.6 38.6-50.7 62.2 6.1 44.5 24.8 97.6 55 150.5l6 1.5c28.2 7 55.8 11.5 81.9 13.7 5.7-8.6 11.2-17.5 16.5-26.8 26-45.1 43.7-90.5 52.4-130.7-8.8-12.5-17.9-24.2-27.1-35-22.6-9.2-47.2-17.4-73.2-23.9z"
          opacity=".5"
          fill="#00d9ea"
        />
        <path
          d="M265 82.2c-20.7-5.2-41.2-9-60.8-11.5-17.4 17.7-34.6 38.6-50.7 62.2 6.1 44.5 24.8 97.6 55 150.5l6 1.5c28.2 7 55.8 11.5 81.9 13.7 5.7-8.6 11.2-17.5 16.5-26.8 26-45.1 43.7-90.5 52.4-130.7-8.8-12.5-17.9-24.2-27.1-35-22.6-9.2-47.2-17.4-73.2-23.9z"
          opacity=".5"
          fill="#00e83c"
        />
        <path
          d="M265 82.2c-20.7-5.2-41.2-9-60.8-11.5-17.4 17.7-34.6 38.6-50.7 62.2 6.1 44.5 24.8 97.6 55 150.5l6 1.5c28.2 7 55.8 11.5 81.9 13.7 5.7-8.6 11.2-17.5 16.5-26.8 26-45.1 43.7-90.5 52.4-130.7-8.8-12.5-17.9-24.2-27.1-35-22.6-9.2-47.2-17.4-73.2-23.9z"
          opacity=".5"
          fill="#ff9a22"
        />
      </svg>
    </div> -->
  </section>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ThemeSelect",
  computed: {
    numSelectedThemes() {
      return this.selectedThemeIds.length;
    },
  },
  data() {
    return {
      themeCircles: [],
    };
  },
  watch: {
    selectedThemeIds: {
      handler: function (new_themes, prev_themes) {
        console.log("Selected themes updated: ", new_themes);
        this.updateThemeCircleColors();
      },
      deep: true,
    },
  },
  inject: ["selectedThemeIds", "selectTheme", "getThemeTitle", "THEMES"],
  methods: {
    updateThemeCircleColors() {
      const circles = d3.selectAll(".theme-circle");
      for (const circleNode of circles) {
        const circleData = this.themeCircles.find(
          (c) => c[0].themeId === circleNode.id
        )[0];
        let circleOpacity = circleData.opacity;

        const circleIsSelected = this.selectedThemeIds.includes(circleNode.id);
        if (circleIsSelected) {
          circleOpacity += 0.4;
        }

        d3.select(circleNode).style(
          "fill",
          `rgba(${circleData.color}, ${circleOpacity})`
        );
      }
    },
    onThemeCircleClicked(data) {
      const themeId = data.themeId;
      this.selectTheme(themeId);
    },
    addThemeCircle(themeId, x, y, radius, col, opacity) {
      const svg = d3.select("svg");
      const circle = svg
        .append("circle")
        .attr("id", themeId)
        .attr("class", "theme-circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", radius)
        .data([{ themeId: themeId, color: col, opacity: opacity }])
        .style("fill", `rgba(${col}, ${opacity})`)
        .on("click", (d, data) => {
          this.onThemeCircleClicked(data);
        });

      /* TODO: Add theme titles as texts */

      this.themeCircles.push(circle.data());
    },
    initThemeCircles() {
      const circleRadius = 50;
      for (let i = 0; i < 5; i++) {
        const themeId = Object.keys(this.THEMES)[i];

        const x = i * 75 + circleRadius;
        const color = this.THEMES[themeId].color;
        this.addThemeCircle(themeId, x, circleRadius, circleRadius, color, 0.2);
      }
    },
  },
  mounted() {
    this.initThemeCircles();

    // const themeParts = d3.selectAll("path");
    // let partIdx = 0;
    // for (const themePart of themeParts) {
    //   console.log(partIdx);

    //   const partId = "theme-blob-" + partIdx;
    //   d3.select(themePart)
    //     .attr("id", partId)
    //     .data([{ themeId: partId}])
    //     .style("fill", "red")
    //     .on("click", (d, data) => {
    //       console.log(data);
    //     });

    //   partIdx++;
    // }
  },
};
</script>

<style scoped>
#theme-blobs-container {
  width: 50%;
  margin: 0 auto;
}
</style>