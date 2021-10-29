<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>About the Living Library</ion-title>
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
      <ion-buttons slot="start">
        <ion-button @click="closeModal">
          <ion-icon name="arrow-back" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding">
    <em>*Disclaimer: The LL is work in progress!*</em>

    <h3>The human face of academia</h3>
    <p>
      The Living Library is an interactive platform made to help you orient
      yourself in the academic literature that speaks about the pandemic in the
      educational field. While other search tools that have been created to date
      are run by algorithms and aim to be comprehensive, extracting and
      visualising quantitative data, the Living Library takes a complementary
      approach: it invites you to get to know a sampled part of the literature
      from an interpretive, human perspective.
    </p>

    <h3>It's alive!</h3>
    <p>
      The library is a small-scale project run by a team of devoted teachers,
      students and researchers. The thematic organisation of articles is based
      on continuous qualitative analyses of the literature with a coding scheme
      that evolves along with the academic conversation. Our aim is to identify
      and help others integrate the various red threads running through the
      literature. Throughout the aftermath of the pandemic, we will keep a
      finger on the pulse, asking: what has happened, what is happening now, and
      what matters? In the Living Library, you can explore overall themes in the
      literature in a connective manner and observe how the academic
      conversation changes over time.
    </p>

    <h3>Contact us</h3>
    <p>
      We invite you to write to us with ideas, questions, praise and criticism
      on the Living Library: <em>[E-MAIL ADDRESS FORTHCOMING]</em>
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

<style scoped></style>
