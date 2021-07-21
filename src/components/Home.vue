<template>
  <ion-header>
    <ion-toolbar>
      <ion-title size="large">
        Main themes in the academic educational literature on the pandemic
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="split themes-panel">
      <theme-select></theme-select>
    </div>
    <div class="split literature-panel">
      <literature-viewer></literature-viewer>
    </div>
  </ion-content>
</template>

<script>
import THEMES from "@/assets/data/themes.json";
import LiteratureViewer from "./LiteratureViewer.vue";
import ThemeSelect from "./ThemeSelect.vue";
import { IonToolbar, IonContent, IonTitle, IonHeader } from "@ionic/vue";

export default {
  data() {
    return {
      selectedThemeIds: [],
      THEMES: THEMES,
    };
  },
  name: "Home",
  inheritAttrs: false,
  components: {
    IonToolbar,
    IonContent,
    IonTitle,
    IonHeader,
    ThemeSelect,
    LiteratureViewer,
  },
  mounted() {},
  methods: {
    selectTheme(themeId) {
      const themeIdIdx = this.selectedThemeIds.indexOf(themeId);
      var themeIsAlreadySelected = themeIdIdx !== -1;
      if (themeIsAlreadySelected) {
        this.selectedThemeIds.splice(themeIdIdx, 1);
      } else {
        this.selectedThemeIds.push(themeId);
      }
    },
    themeIsSelected(themeId) {
      return this.selectedThemeIds.indexOf(themeId) !== -1;
    },
    getThemeData(themeId) {
      if (Object.keys(this.THEMES).includes(themeId)) {
        return this.THEMES[themeId];
      }
      return null;
    },
    getThemeTitle(themeId) {
      return this.getThemeData(themeId)?.title ?? themeId;
    },
    getThemeColor(themeId, opacity = 1) {
      const color = this.getThemeData(themeId)?.color;
      return color
        ? `rgba(${color}, ${opacity})`
        : `rgba(100, 100, 100, ${opacity})`;
    },
  },
  provide() {
    return {
      selectedThemeIds: this.selectedThemeIds,
      themeIsSelected: this.themeIsSelected,
      getThemeData: this.getThemeData,
      getThemeTitle: this.getThemeTitle,
      getThemeColor: this.getThemeColor,
      selectTheme: this.selectTheme,
      THEMES: this.THEMES,
    };
  },
};
</script>

<style scoped>
.split {
  margin-top: 50px;
  height: 100%; /* TODO: Subtract 50px */
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding: 10px;
}

.themes-panel {
  left: 0;
}

.literature-panel {
  right: 0;
}
</style>