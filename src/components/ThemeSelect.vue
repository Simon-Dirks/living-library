<template>
  <ion-grid class="ion-padding-vertical h-full">
    <ion-row>
      <ion-col size="1">
        <time-filter></time-filter>
      </ion-col>
      <ion-col size="4">
        <img
          src="@/assets/img/time-funnel_black.png"
          alt="Time funnel"
          class="time-funnel-img"
          :style="{ opacity: noThemesSelected() ? 0 : 0.3 }"
        />
        <img
          src="@/assets/img/time-funnel_v4.png"
          alt="Time funnel"
          class="time-funnel-img"
          :style="{ opacity: noThemesSelected() ? 1 : 0 }"
        />
        <img
          src="@/assets/img/time-funnel_green.png"
          alt="Time funnel"
          class="time-funnel-img time-funnel-overlay"
          :style="{
            opacity: isThemeSelected('academicAchievementAssessment') ? 1 : 0,
          }"
        />
        <img
          src="@/assets/img/time-funnel_red.png"
          alt="Time funnel"
          class="time-funnel-img time-funnel-overlay"
          :style="{
            opacity: isThemeSelected('contextTeaching') ? 1 : 0,
          }"
        />
        <img
          src="@/assets/img/time-funnel_blue.png"
          alt="Time funnel"
          class="time-funnel-img time-funnel-overlay"
          :style="{
            opacity: isThemeSelected('teachingPractice') ? 1 : 0,
          }"
        />
        <img
          src="@/assets/img/time-funnel_yellow.png"
          alt="Time funnel"
          class="time-funnel-img time-funnel-overlay"
          :style="{
            opacity: isThemeSelected('affect') ? 1 : 0,
          }"
        />
        <img
          src="@/assets/img/time-funnel_gold.png"
          alt="Time funnel"
          class="time-funnel-img time-funnel-overlay"
          :style="{
            opacity: isThemeSelected('equity') ? 1 : 0,
          }"
        />
      </ion-col>
      <ion-col size="7">
        <div class="absolute bottom-0 w-full">
          <div
            v-for="(theme, themeId) in getThemes"
            :key="themeId"
            class="ion-text-right"
          >
            <theme-button :theme-id="themeId"></theme-button>
          </div>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
// import $ from "jquery";
// import "imagemapster";
import { mapGetters, mapMutations } from "vuex";
import TimeFilter from "@/components/TimeFilter";
import ThemeButton from "@/components/ThemeButton";

export default {
  name: "ThemeSelect",
  mixins: [],
  components: { ThemeButton, TimeFilter },
  computed: {
    ...mapGetters({
      getThemeTitle: "themes/getThemeTitle",
      selectedThemeIds: "themes/getSelectedThemeIds",
      getThemes: "themes/getThemes",
      isThemeSelected: "themes/isThemeSelected",
      noThemesSelected: "themes/noThemesSelected",
    }),
  },
  data() {
    return {};
  },
  watch: {
    selectedThemeIds: {
      handler: function (newThemes, prevThemes) {
        // $("area").each((index, area) => {
        //   const themeId = $(area).attr("name");
        //   const isSelected = newThemes.includes(themeId);
        //   $(area).mapster("set", isSelected);
        // });
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations({
      toggleTheme: "themes/toggleTheme",
    }),
    // initializeLineDrawing() {
    // setInterval(() => {
    //   this.$store.dispatch(
    //     "lineDrawing/drawLineBetweenThemeSelectAndTimeFunnel"
    //   );
    // }, 50);
    // },
  },
  mounted() {
    // this.initializeImageMap();
    // this.initializeLineDrawing();
  },
};
</script>

<style>
.time-funnel-img {
  height: 100%;
  max-width: 100%;
  position: absolute;
  top: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease-in-out;
}

.time-funnel-overlay {
  opacity: 1;
}

.theme-select-annotation-text {
  text-align: center;
  font-size: 0.85em;
  width: 80%;
  margin: 10px auto 0;
}
</style>
