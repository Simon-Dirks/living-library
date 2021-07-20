<template>
  <section>
    <h2>Themes</h2>
    <p v-if="numSelectedThemes > 0">
      <strong>
        Selected theme<span v-if="numSelectedThemes > 1">s</span> </strong
      >:
      {{ selectedThemeIds.join(", ") }}
    </p>
    <p v-else><em>No themes selected.</em></p>
    <svg width="100%" height="400px"></svg>
  </section>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "ThemeSelect",
  emits: ["theme-selected"],
  computed: {
    numSelectedThemes() {
      return this.selectedThemeIds.length;
    }
  },
  data() {
    return {
      themeCircles: [],
    };
  },
  inject: ["selectedThemeIds"],
  methods: {
    setThemeCircleColors() {
      const circles = d3.selectAll(".theme-circle");
      for (const circleNode of circles) {
        const circleData = this.themeCircles.find(
          (c) => c[0].themeId === circleNode.id
        )[0];
        let circleOpacity = circleData.opacity;

        const circleIsSelected = this.selectedThemeIds.includes(circleNode.id);
        if (circleIsSelected) {
          circleOpacity += 0.5;
        }

        d3.select(circleNode).style(
          "fill",
          `rgba(${circleData.color}, ${circleOpacity})`
        );
      }
    },
    onThemeCircleClicked(data) {
      const themeId = data.themeId;
      this.$emit("theme-selected", themeId);

      this.setThemeCircleColors();
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
      this.themeCircles.push(circle.data());
    },
    initThemeCircles() {
      const circleRadius = 50;
      for (let i = 0; i < 4; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        // const b = Math.floor(Math.random() * 255);

        let themeId = "theme_" + (i + 1);
        if (i === 0) {
          themeId = "affect";
        } else if (i === 1) {
          themeId = "teaching-practice";
        } else if (i === 2) {
          themeId = "third-theme";
        }
        const x = i * 75 + circleRadius;
        this.addThemeCircle(
          themeId,
          x,
          circleRadius,
          circleRadius,
          `${r}, ${g}, ${128}`,
          0.4
        );
      }
    },
  },
  mounted() {
    this.initThemeCircles();
  },
};
</script>