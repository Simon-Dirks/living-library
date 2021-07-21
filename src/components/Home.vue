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
      <theme-select @theme-selected="onThemeSelected"></theme-select>
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
    onThemeSelected(themeId) {
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
  },
  provide() {
    return {
      selectedThemeIds: this.selectedThemeIds,
      themeIsSelected: this.themeIsSelected,
    };
  },
};
</script>

<style scoped>
.split {
  margin-top: 50px;
  height: 100%;
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