import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import { IonicVue } from "@ionic/vue";
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
