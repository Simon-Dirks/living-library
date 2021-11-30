import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonicVue,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { addIcons } from "ionicons";
import {
  linkOutline,
  bulbOutline,
  bookOutline,
  calendarOutline,
  informationCircleOutline,
  arrowBackOutline,
  helpCircleOutline,
} from "ionicons/icons";
import Config from "@/config.js";
import { initializeApp } from "firebase/app";
import "@ionic/core/css/padding.css";

document.title = "Living Library [PROTOTYPE]";

const store = createStore({
  state() {
    return {
      selectedThemeIds: [],
    };
  },
  mutations: {
    selectTheme(state, themeId) {
      const themeIdIdx = state.selectedThemeIds.indexOf(themeId);
      const themeIsAlreadySelected = themeIdIdx !== -1;

      if (themeIsAlreadySelected) {
        state.selectedThemeIds.splice(themeIdIdx, 1);
      } else {
        state.selectedThemeIds.push(themeId);
      }

      console.log("Selected themes:", state.selectedThemeIds);
    },
  },
  getters: {},
});

const app = createApp(App).use(IonicVue).use(router);
app.use(store);

initializeApp(Config.FIREBASE_CONFIG);

router.isReady().then(() => {
  addIcons({
    link: linkOutline,
    book: bookOutline,
    bulb: bulbOutline,
    "information-circle": informationCircleOutline,
    "arrow-back": arrowBackOutline,
    calendar: calendarOutline,
    "help-circle": helpCircleOutline,
  });

  app.mount("#app");
});

app.component("ion-content", IonContent);
app.component("ion-grid", IonGrid);
app.component("ion-row", IonRow);
app.component("ion-col", IonCol);
app.component("ion-card", IonCard);
app.component("ion-card-title", IonCardTitle);
app.component("ion-card-subtitle", IonCardSubtitle);
app.component("ion-card-header", IonCardHeader);
app.component("ion-card-content", IonCardContent);
app.component("ion-toolbar", IonToolbar);
app.component("ion-header", IonHeader);
app.component("ion-buttons", IonButtons);
app.component("ion-button", IonButton);
app.component("ion-icon", IonIcon);
app.component("ion-chip", IonChip);
app.component("ion-label", IonLabel);
app.component("ion-title", IonTitle);
app.component("ion-checkbox", IonCheckbox);
app.component("ion-item", IonItem);
app.component("ion-spinner", IonSpinner);
