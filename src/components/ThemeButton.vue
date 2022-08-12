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

    <button
      class="theme-reasoning-button"
      v-if="!disableClick && themeReasoning"
      @click.stop="openThemeInfoPopup(themeId)"
      :style="{
        color: isThemeSelected(themeId) ? 'white' : 'darkslategrey',
      }"
    >
      Why?
    </button>
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

<style scoped>
ion-chip {
  height: 25px;
  margin: 7px 10px 0px 0px;
}

.theme-reasoning-button {
  background: rgba(0, 0, 0, 0.05);
  /*border: 1px dashed rgba(0, 0, 0, 0.5);*/
  border: none;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 0.6rem;
  font-style: italic;
  font-family: Monaco, Consolas, "Lucida Console", monospace;
  margin-left: 0.4rem;
}
</style>
