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
        <strong class="ion-margin-end header-title">
          <span>LIVING LIBRARY</span>
        </strong>
        An open science platform for continuous literature surveying
      </ion-title>

      <ion-buttons slot="end">
        <ion-button @click="openMoreInfoModal" id="about-popup-btn">
          <ion-icon name="information-circle" />
          <span class="ion-margin-start">Welcome to the living library</span>
        </ion-button>

        <!--        <login-button></login-button>-->
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid>
      <ion-row>
        <!-- Filter column (left side of the screen) -->
        <ion-col size="5">
          <div class="filter-container">
            <div class="ion-padding-vertical theme-select-container">
              <theme-select></theme-select>
            </div>
            <div class="literature-filter-container">
              <literature-filter
                :onEducationTypeFilterClicked="onEducationTypeFilterClicked"
                :onResearchTypeFilterClicked="onResearchTypeFilterClicked"
              ></literature-filter>
            </div>
          </div>
        </ion-col>
        <!-- Literature column (right side of the screen) -->
        <ion-col class="literature-viewer-column" size="7">
          <literature-viewer></literature-viewer>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import LiteratureViewer from "./LiteratureViewer.vue";
import ThemeSelect from "./ThemeSelect.vue";
import LiteratureFilter from "./LiteratureFilter.vue";
import { modalController } from "@ionic/vue";
import { Config } from "@/config";
import { mapActions } from "vuex";
import InformationPopup from "@/components/popups/InformationPopup.vue";

export default {
  data() {
    return {
      config: Config,
    };
  },
  name: "HomePage",
  inheritAttrs: false,
  components: {
    ThemeSelect,
    LiteratureViewer,
    LiteratureFilter,
  },
  mounted() {
    this.loadLiteratureData();
  },
  methods: {
    ...mapActions({
      loadLiteratureData: "literature/loadLiteratureData",
      updateResearchTypeFilter: "literature/updateResearchTypeFilter",
      updateEducationTypeFilter: "literature/updateEducationTypeFilter",
    }),
    async openMoreInfoModal() {
      const modal = await modalController.create({
        component: InformationPopup,
        componentProps: {},
      });

      await modal.present();
      const modalResponse = await modal.onDidDismiss();
    },
    onEducationTypeFilterClicked(educationTypeKey, event) {
      const showThisKey = event.target.checked;
      this.updateEducationTypeFilter({
        educationTypeKey,
        showEducationType: showThisKey,
      });
    },
    onResearchTypeFilterClicked(researchTypeKey, event) {
      const showThisKey = event.target.checked;
      this.updateResearchTypeFilter({
        researchTypeKey,
        showResearchType: showThisKey,
      });
    },
  },
};
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-flow: column;
  height: 98vh;
}

.theme-select-container {
  flex: 1 1 auto;
  overflow-y: hidden;
}

.literature-filter-container {
  flex: 0 1 auto;
  padding-top: 10px;
  margin-bottom: 70px;
}

#logo-img {
  float: left;
  margin-left: 10px;
  border-radius: 5px;
}

ion-title {
  margin-top: 7px;
}

/*ion-grid,*/
/*ion-row {*/
/*  height: 100%;*/
/*}*/

ion-grid {
  padding: 0;
}

.header-title span {
  font-size: 1rem !important;
}

#about-popup-btn {
  --background: #f7ce63;
  --color: #052640;
  font-weight: bold;
  margin-right: 1rem;
  letter-spacing: 0.1rem;
}

.literature-viewer-column {
  padding-left: 50px;
  padding-bottom: 56px; /* TODO: Use more elegant fix for offsetting header height */
  height: 100vh;
}
</style>
