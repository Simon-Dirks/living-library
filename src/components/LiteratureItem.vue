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
          ><strong v-if="themeIsSelected(themeId)" style="color: white">
            {{ getThemeTitle(themeId) }}</strong
          ><template v-else>{{ getThemeTitle(themeId) }}</template></ion-label
        >
        <ion-icon
          name="information-circle"
          @click.stop="openThemeInfoPopup(themeId)"
          :style="{
            color: themeIsSelected(themeId) ? 'white' : 'darkslategrey',
          }"
        ></ion-icon>
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

      <p>
        <ion-icon class="ion-margin-end" name="calendar" />{{
          timestampToDate(literatureItem["date"])
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
  modalController,
} from "@ionic/vue";
import { dateMixin } from "../mixins/dateMixin";
import ThemeInfoPopup from "@/components/ThemeInfoPopup";

export default {
  mixins: [dateMixin],
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
        : this.getThemeColor(themeId, 0.3);
    },
    async openThemeInfoPopup(themeId) {
      const modal = await modalController.create({
        component: ThemeInfoPopup,
        componentProps: { themeData: this.getThemeData(themeId) },
      });

      await modal.present();
      const modalResponse = await modal.onDidDismiss();
    },
  },
  props: ["literatureItem"],
  inject: [
    "themeIsSelected",
    "getThemeTitle",
    "getThemeColor",
    "selectTheme",
    "getThemeData",
  ],
  name: "LiteratureItem",
};
</script>

<style scoped>
a {
  color: #3880ff;
  text-decoration: none;
}
</style>
