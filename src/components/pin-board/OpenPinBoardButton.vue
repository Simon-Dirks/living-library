<template>
  <ion-button size="small" fill="clear" @click="openPinBoard(logId, logText)">
    <ion-icon name="chatbubbles"></ion-icon>
    <ion-badge color="primary">
      {{ numComments }}
    </ion-badge>
  </ion-button>
</template>

<script>
import { modalController } from "@ionic/vue";
import PinBoard from "@/components/pin-board/PinBoard.vue";

export default {
  name: "OpenPinBoardButton.vue",
  props: ["logId", "logText", "dbLogBookId", "numComments"],
  methods: {
    async openPinBoard(logId, logText) {
      const modal = await modalController.create({
        component: PinBoard,
        componentProps: {
          logId: logId,
          logText: logText,
          dbLogBookId: this.dbLogBookId,
        },
      });

      await modal.present();
    },
  },
};
</script>

<style scoped></style>
