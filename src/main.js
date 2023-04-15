import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  IonBackButton,
  IonBadge,
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
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/vue";
import { addIcons } from "ionicons";
import {
  arrowBackOutline,
  arrowDownOutline,
  bookOutline,
  bulbOutline,
  calendarOutline,
  caretBackOutline,
  caretForwardOutline,
  chatbubblesOutline,
  closeOutline,
  globeOutline,
  helpCircleOutline,
  informationCircleOutline,
  linkOutline,
  newspaperOutline,
  send,
} from "ionicons/icons";

import "@ionic/core/css/padding.css";
import "firebaseui/dist/firebaseui.css";
import store from "@/store";
import { createHead } from "@vueuse/head";
import firebase from "firebase/compat/app";
try {
  const firebaseConfig = (await import("@/firebase-config")).firebaseConfig;
  if (firebaseConfig) {
    firebase.initializeApp(firebaseConfig);
  }
} catch {
  // Skip firebase initialization
}

const head = createHead();
let app = createApp(App).use(head).use(IonicVue).use(router).use(store);

router.isReady().then(() => {
  addIcons({
    link: linkOutline,
    book: bookOutline,
    bulb: bulbOutline,
    close: closeOutline,
    "information-circle": informationCircleOutline,
    "arrow-down": arrowDownOutline,
    "arrow-back": arrowBackOutline,
    calendar: calendarOutline,
    "help-circle": helpCircleOutline,
    globe: globeOutline,
    "caret-forward": caretForwardOutline,
    "caret-back": caretBackOutline,
    newspaper: newspaperOutline,
    chatbubbles: chatbubblesOutline,
    send: send,
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
app.component("ion-select", IonSelect);
app.component("ion-select-option", IonSelectOption);
app.component("ion-textarea", IonTextarea);
app.component("ion-input", IonInput);
app.component("ion-badge", IonBadge);
