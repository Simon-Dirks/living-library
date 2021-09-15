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

import "@ionic/core/css/padding.css";
import THEMES from "@/assets/data/themes.json";

document.title = "Living Library [PROTOTYPE]";

const store = createStore({
  state() {
    return {
      selectedThemeIds: [],
      THEMES: THEMES,
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
});

const app = createApp(App).use(IonicVue).use(router);
app.use(store);

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
