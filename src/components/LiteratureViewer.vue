<template>
  <ion-content>
    <h2>Literature</h2>

    <template v-for="literatureItem in literatureData" :key="literatureItem.id">
      <ion-card v-if="literatureItemThemesAreSelected(literatureItem)">
        <ion-card-header>
          <ion-card-title>{{ literatureItem.title }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            Themes:
            <span v-html="literatureItem.themes.join(', ')"></span>
          </p>
        </ion-card-content>
      </ion-card>
    </template>
  </ion-content>
</template>

<script>
import rawLiteratureData from "../assets/data/literature.json";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
} from "@ionic/vue";

export default {
  inject: ["selectedThemeIds"],
  name: "LiteratureViewer",
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  data() {
    return {
      literatureData: rawLiteratureData,
    };
  },
  methods: {
    literatureItemThemesAreSelected(literatureItem) {
      return (
        literatureItem.themes.filter((theme) =>
          this.selectedThemeIds.includes(theme)
        ).length > 0
      );
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>