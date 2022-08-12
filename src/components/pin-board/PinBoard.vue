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

    <pin-board-sticky
      v-for="(comment, commentId) in comments"
      :key="commentId"
      :comment="comment"
    ></pin-board-sticky>
    <pin-board-sticky :log-id="logId"></pin-board-sticky>
  </div>
</template>

<script>
import { modalController } from "@ionic/vue";
import PinBoardSticky from "@/components/pin-board/PinBoardSticky";
import { mapActions } from "vuex";
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  name: "PinBoard",
  props: ["logId", "logText"],
  components: { PinBoardSticky },
  data() {
    return {
      comments: null,
    };
  },
  mounted() {
    const db = getDatabase();
    const commentsRef = ref(db, "themeLogbookComments/" + this.logId);
    onValue(commentsRef, (snapshot) => {
      const commentsSnapshot = snapshot.val();
      this.comments = commentsSnapshot;
    });
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
