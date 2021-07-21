<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ literatureItem["Article name"] }}</ion-card-title>
      <br />
      <ion-chip
        v-for="themeId in literatureItem['Theme.FINDINGS']"
        :key="themeId"
      >
        <ion-label color="secondary"
          ><strong v-if="themeIsSelected(themeId)">
            {{ getThemeTitle(themeId) }}</strong
          ><template v-else>{{ getThemeTitle(themeId) }}</template></ion-label
        >
      </ion-chip>
    </ion-card-header>
    <ion-card-content>
      <p>
        <a :href="literatureItem['Article Link']" target="_blank"
          ><ion-icon class="ion-margin-end" name="link" />
          <span v-if="literatureItem.Authors">
            {{ literatureItem.Authors }}</span
          ><span v-else>Article link</span>
        </a>
      </p>

      <p>
        <ion-icon class="ion-margin-end" name="book" />{{
          literatureItem["Journal"]
        }}
      </p>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonLabel
} from "@ionic/vue";

export default {
  components: {
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    // IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonLabel
  },
  props: ["literatureItem"],
  inject: ["themeIsSelected", "getThemeTitle"],
  name: "LiteratureItem",
};
</script>

<style scoped>
a {
  color: #3880ff;
  text-decoration: none;
}
</style>