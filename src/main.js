import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  IonBackButton,
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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToggle,
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
  globeOutline,
  caretForwardOutline,
  caretBackOutline,
} from "ionicons/icons";
import Config from "@/config.js";
import { initializeApp } from "firebase/app";
import "@ionic/core/css/padding.css";
import store from "@/store";

document.title = "Living Library [PROTOTYPE]";

const app = createApp(App).use(IonicVue).use(router).use(store);

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
    globe: globeOutline,
    "caret-forward": caretForwardOutline,
    "caret-back": caretBackOutline,
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
app.component("ion-infinite-scroll-content", IonInfiniteScrollContent);
app.component("ion-infinite-scroll", IonInfiniteScroll);
app.component("ion-list", IonList);
app.component("ion-item", IonItem);
app.component("ion-spinner", IonSpinner);
app.component("ion-toggle", IonToggle);
app.component("ion-back-button", IonBackButton);
app.component("ion-page", IonPage);
