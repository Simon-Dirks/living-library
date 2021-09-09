<template>
  <ion-header>
    <ion-toolbar>
      <img src="@/assets/img/logo/logo_v3.png" height="40" id="logo-img" />

      <ion-title>
        [WORK IN PROGRESS] Main themes in the academic educational literature on
        the pandemic
      </ion-title>

      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <ion-buttons slot="end">
        <ion-button @click="openMoreInfoModal" id="about-popup-btn">
          <ion-icon name="information-circle" />
          <span class="ion-margin-start">About the living library</span>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <theme-select></theme-select>
        </ion-col>
        <ion-col>
          <literature-viewer></literature-viewer>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import THEMES from "@/assets/data/themes.json";
import LiteratureViewer from "./LiteratureViewer.vue";
import ThemeSelect from "./ThemeSelect.vue";
import {
  modalController,
  IonToolbar,
  IonContent,
  IonTitle,
  IonHeader,
  IonIcon,
  IonButtons,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
} from "@ionic/vue";
import InformationPopup from "./InformationPopup.vue";

export default {
  data() {
    return {
      selectedThemeIds: [],
      timeFilter: { min: null, max: null },
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
    IonIcon,
    IonButtons,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    ThemeSelect,
    LiteratureViewer,
  },
  mounted() {},
  methods: {
    async openMoreInfoModal() {
      const modal = await modalController.create({
        component: InformationPopup,
        componentProps: {},
      });

      await modal.present();
      const modalResponse = await modal.onDidDismiss();
    },
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
      for (const selectedThemeId of this.selectedThemeIds) {
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
      if (Object.keys(this.THEMES).includes(themeId)) {
        return this.THEMES[themeId];
      }
      return null;
    },
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
    updateTimeFilter(min, max) {
      this.timeFilter = { min: min, max: max };
      this.$forceUpdate();
    },
    getTimeFilter() {
      return this.timeFilter;
    },
  },
  provide() {
    return {
      selectedThemeIds: this.selectedThemeIds,
      themeIsSelected: this.themeIsSelected,
      getThemeData: this.getThemeData,
      getThemeTitle: this.getThemeTitle,
      getThemeColor: this.getThemeColor,
      getIntersectionThemes: this.getIntersectionThemes,
      selectTheme: this.selectTheme,
      THEMES: this.THEMES,
      updateTimeFilter: this.updateTimeFilter,
      getTimeFilter: this.getTimeFilter,
    };
  },
};
</script>

<style scoped>
#logo-img {
  float: left;
  margin-left: 10px;
  border-radius: 5px;
}
ion-title {
  margin-top: 7px;
}

.split {
  margin-top: 50px;
  height: 100%; /* TODO: Subtract 50px */
  width: 45%;
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

ion-grid,
ion-row {
  height: 100%;
}

#about-popup-btn {
  --background: #3498db;
  --color: white;
}
</style>
