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

    <div class="theme-select-buttons-container">
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
      handler: function (new_themes, prev_themes) {
        console.log("Selected themes updated: ", new_themes);
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
  mounted() {},
};
</script>

<style scoped>
</style>