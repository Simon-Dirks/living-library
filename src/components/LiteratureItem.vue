<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ literatureItem["Article name"] }}</ion-card-title>
      <br />
      <ion-chip
        @click="selectTheme(themeId)"
        :style="{
          '--background': getThemeChipColor(themeId),
        }"
        v-for="themeId in literatureItem['themes']"
        :key="themeId"
      >
        <ion-label color="secondary"
          ><strong v-if="themeIsSelected(themeId)" style="color: white;">
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
  IonLabel,
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
    IonLabel,
  },
  methods: {
    getThemeChipColor(themeId) {
      return this.themeIsSelected(themeId)
        ? this.getThemeColor(themeId)
        : this.getThemeColor(themeId, 0.1);
    },
  },
  props: ["literatureItem"],
  inject: ["themeIsSelected", "getThemeTitle", "getThemeColor", "selectTheme"],
  name: "LiteratureItem",
};
</script>

<style scoped>
a {
  color: #3880ff;
  text-decoration: none;
}
</style>