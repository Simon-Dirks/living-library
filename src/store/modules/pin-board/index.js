import { getDatabase, push, ref, remove, set } from "firebase/database";

const pinBoardModule = {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {},
  actions: {
    async sendComment(context, payload) {
      console.log("Sending comment:", payload);
      const db = getDatabase();
      const commentsRef = ref(
        db,
        payload["dbLogBookId"] + "/" + payload["logId"]
      );
      const newCommentRef = push(commentsRef);
      return await set(newCommentRef, payload["comment"]);
    },
    async removeComment(context, payload) {
      console.log("Removing comment:", payload);
      const db = getDatabase();
      const commentRef = ref(
        db,
        `${payload["dbLogBookId"]}/${payload["logId"]}/${payload["commentId"]}`
      );
      return await remove(commentRef);
    },
  },
  getters: {},
};

export default pinBoardModule;
