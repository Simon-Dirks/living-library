import { createStore } from "vuex";
import themeModule from "@/store/modules/themes";
import literatureModule from "@/store/modules/literature";
import timeFilterModule from "@/store/modules/time-filter";
import lineDrawingModule from "@/store/modules/line-drawing";
import imageMapModule from "@/store/modules/image-map";
import themeLogbookModule from "@/store/modules/theme-logbook";

const store = createStore({
  modules: {
    themes: themeModule,
    themeLogbook: themeLogbookModule,
    literature: literatureModule,
    timeFilter: timeFilterModule,
    lineDrawing: lineDrawingModule,
    imageMap: imageMapModule,
  },
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {
    sendHttpRequest: async (context, { url, responseType }) => {
      return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = responseType;
        xhr.onload = async (event) => {
          return resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject({
            status: this.status,
            statusText: xhr.statusText,
          });
        };
        xhr.open("GET", url);
        xhr.send();
      });
    },
  },
});

export default store;
