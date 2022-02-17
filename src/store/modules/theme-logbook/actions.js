import Config from "@/config";
import Papa from "papaparse";

export default {
  loadThemeLogbookData: async (context) => {
    const rawResponse = await context.dispatch("getThemeLogbookCsvFile");

    let logbookData = Papa.parse(rawResponse, {
      header: true,
      dynamicTyping: true,
    }).data;

    console.log("Theme logbook data:", logbookData);
    context.commit("setLogbookData", logbookData);
  },
  getThemeLogbookCsvFile: async (context) => {
    console.log(
      "Downloading theme logbook CSV file...",
      Config.THEME_LOGBOOK_CSV_URL
    );

    const rawResponse = await context.dispatch(
      "sendHttpRequest",
      { url: Config.THEME_LOGBOOK_CSV_URL, responseType: "text" },
      { root: true }
    );
    return rawResponse;
  },
};
