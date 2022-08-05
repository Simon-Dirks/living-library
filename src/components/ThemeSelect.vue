<template>
  <ion-grid class="ion-padding-vertical h-full">
    <ion-row>
      <ion-col size="1">
        <time-filter></time-filter>
      </ion-col>
      <ion-col size="4">
        <img
            src="@/assets/img/time-funnel_v4.png"
            alt="Time funnel"
            id="time-funnel-img"
        />
      </ion-col>
      <ion-col size="7">
        <div class="absolute bottom-0 w-full">
          <div v-for="(theme, themeId) in getThemes" :key="themeId" class="ion-text-right"
          >
            <theme-button
                :theme-id="themeId"
            ></theme-button>
          </div>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
// import $ from "jquery";
// import "imagemapster";
import {mapGetters, mapMutations} from "vuex";
import TimeFilter from "@/components/TimeFilter";
import ThemeButton from "@/components/ThemeButton";

export default {
  name: "ThemeSelect",
  mixins: [],
  components: {ThemeButton, TimeFilter},
  computed: {
    ...mapGetters({
      getThemeTitle: "themes/getThemeTitle",
      selectedThemeIds: "themes/getSelectedThemeIds",
      getThemes: "themes/getThemes"
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
    initializeLineDrawing() {
      // setInterval(() => {
      //   this.$store.dispatch(
      //     "lineDrawing/drawLineBetweenThemeSelectAndTimeFunnel"
      //   );
      // }, 50);
    },
  },
  mounted() {
    // this.initializeImageMap();
    // this.initializeLineDrawing();
  },
};
</script>

<style>
#time-funnel-img {
  height: 100%;
  max-width: 100%;
}

.theme-select-annotation-text {
  text-align: center;
  font-size: 0.85em;
  width: 80%;
  margin: 10px auto 0;
}
</style>
