export const themeMixin = {
  data() {
    return {};
  },
  computed: {
    themes() {
      return this.$store.state.THEMES;
    },
  },
  created() {},
  methods: {
    getHighlevelThemeId(rawThemeId) {
      for (const [themeId, theme] of Object.entries(this.themes)) {
        if (theme.themes.includes(rawThemeId)) {
          return themeId;
        }
      }

      return rawThemeId;
    },
    selectTheme(themeId) {
      this.$store.commit("selectTheme", themeId);
    },
    getSelectedThemeIds() {
      return this.$store.state.selectedThemeIds;
    },
    themeIsSelected(themeId) {
      for (const selectedThemeId of this.getSelectedThemeIds()) {
        const intersectionThemeIds =
          this.getIntersectionThemes(selectedThemeId);
        if (intersectionThemeIds) {
          for (const intersectionThemeId of intersectionThemeIds) {
            if (themeId === intersectionThemeId) {
              return true;
            }
          }
        } else if (selectedThemeId === themeId) {
          return true;
        }
      }
      return false;
    },
    getThemeData(themeId) {
      if (Object.keys(this.themes).includes(themeId)) {
        return this.themes[themeId];
      }
      return null;
    },
    // TODO: Remove intersection support if it remains unused
    getIntersectionThemes(themeId) {
      if (themeId.includes("intersect")) {
        let intersectionThemeIds = themeId.split("_");
        intersectionThemeIds.shift();
        return intersectionThemeIds;
      }
      return null;
    },
    getThemeTitle(themeId) {
      let intersectionThemes = this.getIntersectionThemes(themeId);
      if (intersectionThemes) {
        intersectionThemes = intersectionThemes.map(
          (themeId) => this.getThemeData(themeId)?.title ?? themeId
        );
        return "Intersection of " + intersectionThemes.join(" & ");
      }

      return this.getThemeData(themeId)?.title ?? themeId;
    },
    getThemeColor(themeId, opacity = 1) {
      const color = this.getThemeData(themeId)?.color;
      return color
        ? `rgba(${color}, ${opacity})`
        : `rgba(100, 100, 100, ${opacity})`;
    },
  },
};
