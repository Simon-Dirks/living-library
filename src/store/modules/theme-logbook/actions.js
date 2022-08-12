import { Config } from "@/config";
import Papa from "papaparse";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  remove,
} from "firebase/database";

export default {
  loadThemeLogbookData: async (context) => {
    const rawResponse = await context.dispatch("getThemeLogbookCsvFile");

    let logbookData = Papa.parse(rawResponse, {
      header: true,
      dynamicTyping: true,
    }).data;

    console.log("Downloaded theme logbook data:", logbookData);
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
  // async getCommentsSnapshot(context, logId) {
  //   const dbRef = ref(getDatabase());
  //   const snapshot = await get(child(dbRef, `themeLogbookComments/${logId}`));
  //
  //   if (snapshot.exists()) {
  //     const snapshotData = snapshot.val();
  //     return Promise.resolve(snapshotData);
  //   }
  //   return Promise.resolve([]);
  // },
  async sendComment(context, payload) {
    console.log("Sending comment:", payload);
    const db = getDatabase();
    const commentsRef = ref(db, "themeLogbookComments/" + payload["logId"]);
    const newCommentRef = push(commentsRef);
    return await set(newCommentRef, payload["comment"]);
  },
  async removeComment(context, payload) {
    console.log("Removing comment:", payload);
    const db = getDatabase();
    const commentRef = ref(
      db,
      `themeLogbookComments/${payload["logId"]}/${payload["commentId"]}`
    );
    return await remove(commentRef);
  },
};
