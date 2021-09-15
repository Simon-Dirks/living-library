<template>
  <ion-header>
    <ion-toolbar>
      <img src="@/assets/img/logo/logo_v5.png" height="40" id="logo-img" />

      <ion-title>
        <strong class="ion-margin-end">LIVING LIBRARY</strong> Navigate an
        up-to-date library of educational literature on the pandemic
      </ion-title>
      <!--      Main themes in the academic educational literature on the pandemic-->

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
        <ion-col class="literature-viewer-column">
          <literature-viewer></literature-viewer>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
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
      timeFilter: { min: null, max: null },
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

ion-grid,
ion-row {
  height: 100%;
}

#about-popup-btn {
  --background: #3498db;
  --color: white;
}

.literature-viewer-column {
  padding-left: 50px;
}
</style>
