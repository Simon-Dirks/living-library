<template>
  <ion-header class="information-modal-header">
    <ion-toolbar>
      <ion-title><strong>Discussion</strong> {{ logId }}</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon name="arrow-back" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding information-modal-container">
    <p>
      <em>{{ logText }}</em>
    </p>

    <div v-if="firebaseIsInitialized">
      <pin-board-sticky
        v-for="(comment, commentId) in comments"
        :key="commentId"
        :comment="comment"
        :commentId="commentId"
        :log-id="logId"
        :db-log-book-id="dbLogBookId"
      ></pin-board-sticky>

      <pin-board-sticky
        :log-id="logId"
        :db-log-book-id="dbLogBookId"
      ></pin-board-sticky>
    </div>
    <div v-if="!firebaseIsInitialized">
      <p><em>Failed to show discussion. Firebase is not initialized...</em></p>
    </div>
  </div>
</template>

<script>
import { modalController } from "@ionic/vue";
import PinBoardSticky from "@/components/pin-board/PinBoardSticky.vue";
import { mapActions } from "vuex";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApps } from "firebase/app";

export default {
  name: "PinBoard",
  props: ["logId", "logText", "dbLogBookId"],
  components: { PinBoardSticky },
  data() {
    return {
      comments: null,
      firebaseIsInitialized: false,
    };
  },
  mounted() {
    this.firebaseIsInitialized = getApps().length > 0;
    if (this.firebaseIsInitialized) {
      const db = getDatabase();
      const commentsRef = ref(db, this.dbLogBookId + "/" + this.logId);
      onValue(commentsRef, (snapshot) => {
        const commentsSnapshot = snapshot.val();
        this.comments = commentsSnapshot;
      });
    }
  },
  methods: {
    ...mapActions({
      getComments: "themeLogbook/getCommentsSnapshot",
    }),
    closeModal() {
      modalController.dismiss();
    },
  },
};
</script>

<style>
.ion-page {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.information-modal-header {
  flex: 0 1 auto;
}

.information-modal-container {
  flex: 0 1 auto;
  overflow: auto;
}
</style>
