<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Living Library</ion-title>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon name="arrow-back" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt soluta
      aspernatur odit repellendus aliquam ad quasi, dignissimos ipsam itaque
      quibusdam ducimus voluptas, ea natus, quod saepe incidunt placeat.
      Molestiae, sapiente?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt soluta
      aspernatur odit repellendus aliquam ad quasi, dignissimos ipsam itaque
      quibusdam ducimus voluptas, ea natus, quod saepe incidunt placeat.
      Molestiae, sapiente?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt soluta
      aspernatur odit repellendus aliquam ad quasi, dignissimos ipsam itaque
      quibusdam ducimus voluptas, ea natus, quod saepe incidunt placeat.
      Molestiae, sapiente?
    </p>
  </div>
</template>

<script>
import {
  modalController,
  IonContent,
  IonButton,
  IonHeader,
  IonTitle,
} from "@ionic/vue";

export default {
  name: "InformationPopup",
  components: { IonButton, IonHeader, IonTitle },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
};
</script>

<style scoped>
</style>