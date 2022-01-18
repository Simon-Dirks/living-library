<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ themeData.title }}</ion-title>
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon name="arrow-back" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding">
    <p v-if="themeReasoning" v-html="themeReasoning"></p>
    <p v-else v-html="themeData.description"></p>
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
