<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ themeData.title }}</ion-title>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon name="arrow-back" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding">
    <p v-html="themeData.description"></p>
  </div>
</template>

<script>
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";

export default {
  name: "ThemeInfoPopup",
  components: {
    IonButton,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonHeader,
    IonIcon,
  },
  props: ["themeData"],
  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
};
</script>

<style scoped></style>
