<template>
  <ion-header>
    <ion-toolbar>
      <ion-title v-if="themeData?.title">{{ themeData.title }}</ion-title>
      <ion-title v-else>Unknown theme selected</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon name="arrow-back" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding" v-if="themeData">
    <p v-if="themeReasoning" v-html="themeReasoning"></p>
    <p v-else v-html="themeData.description"></p>
  </div>
  <div class="ion-padding" v-if="!themeData">
    <p>No additional information is known about this theme.</p>
  </div>
</template>

<script>
import { modalController } from "@ionic/vue";

export default {
  name: "ThemeInfoPopup",
  components: {},
  props: ["themeData", "themeReasoning"],
  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
};
</script>

<style scoped></style>
