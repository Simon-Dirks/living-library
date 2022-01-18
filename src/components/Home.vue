<template>
  <ion-header>
    <ion-toolbar>
      <img
        src="@/assets/img/logo/logo_v5.png"
        height="40"
        id="logo-img"
        alt="CARE logo"
      />

      <ion-title>
        <strong class="ion-margin-end"
          ><span v-if="config.DEBUG_MODE">[DEBUG MODE]</span
          ><span v-else>LIVING LIBRARY</span></strong
        >
        Navigate an up-to-date library of educational literature on the pandemic
      </ion-title>

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
import { modalController } from "@ionic/vue";
import InformationPopup from "./InformationPopup.vue";
import Config from "@/config.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      config: Config,
    };
  },
  name: "Home",
  inheritAttrs: false,
  components: {
    ThemeSelect,
    LiteratureViewer,
  },
  mounted() {
    this.loadLiteratureData();
  },
  methods: {
    ...mapActions({
      loadLiteratureData: "literature/loadLiteratureData",
    }),
    async openMoreInfoModal() {
      const modal = await modalController.create({
        component: InformationPopup,
        componentProps: {},
      });

      await modal.present();
      const modalResponse = await modal.onDidDismiss();
    },
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

ion-grid {
  padding: 0;
}

#about-popup-btn {
  --background: #3498db;
  --color: white;
}

.literature-viewer-column {
  padding-left: 50px;
}
</style>
