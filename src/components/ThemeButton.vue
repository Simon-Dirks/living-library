<template>
  <ion-chip
    @click="onToggleTheme(themeId)"
    :style="{
      '--background': getThemeChipColor(themeId),
    }"
    :key="themeId"
  >
    <ion-label color="secondary"
      ><strong v-if="isThemeSelected(themeId)" class="text-white">
        {{ getThemeTitle(themeId) }}</strong
      >
      <template v-else>{{ getThemeTitle(themeId) }}</template>
    </ion-label>

    <ion-icon
      v-if="!disableClick && themeReasoning"
      name="information-circle"
      @click.stop="openThemeInfoPopup(themeId)"
      :style="{
        color: isThemeSelected(themeId) ? 'white' : 'darkslategrey',
      }"
    ></ion-icon>
  </ion-chip>
</template>

<script>
import { modalController } from "@ionic/vue";
import ThemeInfoPopup from "@/components/popups/ThemeInfoPopup";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ThemeButton",
  props: ["themeId", "themeReasoning", "disableClick"],
  computed: {
    ...mapGetters({
      isThemeSelected: "themes/isThemeSelected",
      getThemeTitle: "themes/getThemeTitle",
      getThemeChipColor: "themes/getThemeChipColor",
      getThemeData: "themes/getThemeData",
    }),
  },
  methods: {
    ...mapMutations({
      toggleTheme: "themes/toggleTheme",
    }),
    async openThemeInfoPopup(themeId) {
      if (this.disableClick) {
        return;
      }

      const modal = await modalController.create({
        component: ThemeInfoPopup,
        componentProps: {
          themeData: this.getThemeData(themeId),
          themeReasoning: this.themeReasoning,
        },
      });

      await modal.present();
      await modal.onDidDismiss();
    },
    onToggleTheme(themeId) {
      if (this.disableClick) {
        return;
      }
      this.toggleTheme(themeId);
    },
  },
};
</script>

<style>
ion-chip {
  height: 25px;
  margin: 5px 10px 0px 0px;
}
</style>
