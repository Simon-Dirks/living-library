<template>
  <ion-grid class="ion-padding-vertical h-full">
    <ion-row>
      <ion-col size="1">
        <time-filter></time-filter>
      </ion-col>
      <ion-col size="5">
        <div v-if="Config.USE_STATIC_TIMEFUNNEL_IMG">
          <img
            src="@/assets/img/image-archive/time-funnel_v2.png"
            alt="Time funnel"
            class="time-funnel-img"
            :style="{ opacity: 1 }"
          />
        </div>
        <div v-if="!Config.USE_STATIC_TIMEFUNNEL_IMG">
          <img
            src="@/assets/img/time-funnel_black-v2.png"
            alt="Time funnel"
            class="time-funnel-img"
            :style="{ opacity: noThemesSelected() ? 0 : 0.3 }"
          />
          <img
            src="@/assets/img/image-archive/time-funnel_v2.png"
            alt="Time funnel"
            class="time-funnel-img"
            :style="{ opacity: noThemesSelected() ? 1 : 0 }"
          />
          <img
            src="@/assets/img/time-funnel_green-v2.png"
            alt="Time funnel"
            class="time-funnel-img time-funnel-overlay"
            :style="{
              opacity: isThemeSelected('academicAchievementAssessment') ? 1 : 0,
            }"
          />
          <img
            src="@/assets/img/time-funnel_red-v2.png"
            alt="Time funnel"
            class="time-funnel-img time-funnel-overlay"
            :style="{
              opacity: isThemeSelected('contextTeaching') ? 1 : 0,
            }"
          />
          <img
            src="@/assets/img/time-funnel_blue-v2.png"
            alt="Time funnel"
            class="time-funnel-img time-funnel-overlay"
            :style="{
              opacity: isThemeSelected('teachingPractice') ? 1 : 0,
            }"
          />
          <img
            src="@/assets/img/time-funnel_yellow-v2.png"
            alt="Time funnel"
            class="time-funnel-img time-funnel-overlay"
            :style="{
              opacity: isThemeSelected('affect') ? 1 : 0,
            }"
          />
          <img
            src="@/assets/img/time-funnel_gold-v2.png"
            alt="Time funnel"
            class="time-funnel-img time-funnel-overlay"
            :style="{
              opacity: isThemeSelected('equity') ? 1 : 0,
            }"
          />
          <img
            src="@/assets/img/time-funnel_purple.png"
            alt="Time funnel"
            class="time-funnel-img time-funnel-overlay"
            :style="{
              opacity: isThemeSelected('technology') ? 1 : 0,
            }"
          />
        </div>
      </ion-col>
      <ion-col size="6">
        <div class="absolute bottom-0 h-full w-full">
          <h2 class="ion-no-margin">Explore the literature...</h2>

          <h3 class="absolute ion-no-margin ion-margin-top font-normal">
            <ion-icon
              name="arrow-back"
              class="relative"
              style="top: 3px"
            ></ion-icon>
            by date of submission
          </h3>

          <div class="absolute bottom-0">
            <h3 class="ion-no-margin ion-margin-bottom font-normal">
              <ion-icon
                name="arrow-down"
                class="relative"
                style="top: 3px"
              ></ion-icon>
              by thematic content
            </h3>
            <div
              v-for="(theme, themeId) in getThemes"
              :key="themeId"
              class="ion-text-right"
            >
              <theme-button :theme-id="themeId"></theme-button>
            </div>
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
import { Config } from "@/config";

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
    return {
      Config: Config,
    };
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
