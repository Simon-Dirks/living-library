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
import LiteratureViewer from "./LiteratureViewer.vue";
import ThemeSelect from "./ThemeSelect.vue";
import { IonToolbar, IonContent, IonTitle, IonHeader } from "@ionic/vue";

export default {
  data() {
    return {
      selectedThemeIds: [],
      THEMES: {
        "them.AFF": { title: "Affect" },
        "them.TEC": { title: "Teaching practice" },
        "them.TPD": { title: "Context of teaching" },
        "them.AS": { title: "Academic achievement and assessment" },
        "them.EQU": { title: "Equity" },
      },
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
    getThemeTitle(themeId) {
      if (Object.keys(this.THEMES).includes(themeId)) {
        return this.THEMES[themeId].title;
      }
      return themeId;
    },
  },
  provide() {
    return {
      selectedThemeIds: this.selectedThemeIds,
      themeIsSelected: this.themeIsSelected,
      getThemeTitle: this.getThemeTitle,
      selectTheme: this.selectTheme,
      THEMES: this.THEMES
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