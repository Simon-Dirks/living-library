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
        <strong class="ion-margin-end header-title"
        ><span v-if="config.DEBUG_MODE">[DEBUG MODE]</span
        ><span v-else>LIVING LIBRARY</span></strong
        >
        Navigate an up-to-date library of educational literature on the pandemic
      </ion-title>

      <ion-buttons slot="end">
        <ion-button size="small" fill="clear" id="themes-logs-button" @click="onLogbookButtonClicked">
          <ion-icon name="book" class="ion-margin-end"></ion-icon>
          <span>
                View researcher logbook
              </span>
        </ion-button>

        <ion-button @click="openMoreInfoModal" id="about-popup-btn">
          <ion-icon name="information-circle"/>
          <span class="ion-margin-start">About the living library</span>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col>
          <div class="filter-container">
            <h2 class="ion-margin-start ion-no-margin ion-margin-top">Explore the themes</h2>
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
import LiteratureFilter from "./LiteratureFilter.vue";
import {modalController} from "@ionic/vue";
import {Config} from "@/config";
import {mapActions} from "vuex";
import InformationPopup from "@/components/popups/InformationPopup";

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
    LiteratureFilter
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
    onLogbookButtonClicked() {
      window.location.href = "/researcher-logbook";
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

#themes-logs-button {
  --background: #52c1ee;
  --color: white;
  font-weight: bold;
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
  --background: #52c1ee;
  --color: white;
  font-weight: bold;
  margin-left: 1rem;
}

.literature-viewer-column {
  padding-left: 50px;
  padding-bottom: 56px; /* TODO: Use more elegant fix for offsetting header height */
  height: 100vh;
}
</style>
