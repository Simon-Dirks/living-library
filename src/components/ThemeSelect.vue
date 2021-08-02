<template>
  <ion-grid class="ion-margin-top">
    <ion-row>
      <ion-col size="1">
        <div class="timeslider-container">
          <h3 id="timeslider-caption">Flow of time &#8594;</h3>

          <vue-slider
            v-model="sliderValue"
            direction="btt"
            height="300px"
            :min="minDateTimeSlider"
            :max="maxDateTimeSlider"
            :enable-cross="false"
            :tooltip-formatter="sliderFormatter"
            tooltip-placement="right"
            tooltip="always"
            v-on:change="onUpdateTimeFilter"
            v-on:drag-start="draggingTimeFilter = true"
            v-on:drag-end="draggingTimeFilter = false"
          >
            <!-- <template v-slot:tooltip="{ value }">
              <div class="custom-tooltip">{{ timestampToDate(value) }}</div>
            </template> -->
          </vue-slider>
        </div>
      </ion-col>
      <ion-col size="4">
        <img
          src="@/assets/img/time-funnel.png"
          alt="Time funnel"
          id="time-funnel-img"
        />
      </ion-col>
      <ion-col size="7">
        <div class="theme-select-blobs-container ion-margin-top">
          <img
            src="@/assets/img/blobs.png"
            usemap="#image-map"
            id="blobs-img"
          />

          <map name="image-map">
            <area
              target=""
              alt="equity"
              title="equity"
              href=""
              coords="996,512,870,575,734,763,573,903,326,912,157,1131,263,1320,588,1396,814,1381,1004,1158,1026,874,1066,633"
              shape="poly"
            />
            <area
              target=""
              alt="contextTeaching"
              title="contextTeaching"
              href=""
              coords="1800,524,1715,503,1722,402,1548,420,1343,521,1192,633,1089,799,1116,892,1034,969,879,955,697,892,665,1125,736,1271,923,1387,1142,1408,1487,1397,1693,1215,1816,865"
              shape="poly"
            />
            <area
              target=""
              alt="affect"
              title="affect"
              href=""
              coords="177,1032,133,861,231,577,434,492,594,505,1038,889,967,1226,570,1249,263,1146"
              shape="poly"
            />
            <area
              target=""
              alt="academicAchievementAssessment"
              title="academicAchievementAssessment"
              href=""
              coords="1288,335,717,1,170,76,12,346,67,611,581,810,1053,897,1196,767,1294,513"
              shape="poly"
            />
            <area
              target=""
              alt="teachingPractice"
              title="teachingPractice"
              href=""
              coords="1718,190,1198,66,904,56,583,243,477,461,546,731,678,861,1036,916,1174,860,1248,701,1429,689,1675,595,1725,376"
              shape="poly"
            />
          </map>

          <p class="theme-select-annotation-text">
            <em>THIS IS A CROSS-SECTION</em>
          </p>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>

  <div class="theme-select-buttons-container ion-margin-top" v-if="false">
    <div
      class="theme-select-button-container"
      v-for="themeId in getAllPossibleThemeIds()"
      :key="themeId"
    >
      <button @click="selectTheme(themeId)">
        {{ getThemeTitle(themeId) }}
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "imagemapster";
import { dateMixin } from "../mixins/dateMixin";
import { utilsMixin } from "../mixins/utilsMixin";
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "ThemeSelect",
  mixins: [dateMixin, utilsMixin],
  components: { IonGrid, IonRow, IonCol, VueSlider },
  computed: {},
  data() {
    return {
      minDateTimeSlider: this.dateToTimestamp(new Date(2020, 1, 1)),
      maxDateTimeSlider: this.dateToTimestamp(new Date()),
      sliderValue: [
        this.dateToTimestamp(new Date(2020, 1, 1)),
        this.dateToTimestamp(new Date()),
      ],
      sliderFormatter: this.timestampToDate,
      draggingTimeFilter: false,
      linesState: "",
    };
  },
  watch: {
    selectedThemeIds: {
      handler: function (newThemes, prevThemes) {
        console.log("Selected themes updated: ", newThemes);
        $("area").each((index, area) => {
          const themeId = $(area).attr("name");
          const isSelected = newThemes.includes(themeId);
          $(area).mapster("set", isSelected);
        });
      },
      deep: true,
    },
  },
  inject: [
    "selectedThemeIds",
    "selectTheme",
    "getThemeTitle",
    "THEMES",
    "updateTimeFilter",
    "getTimeFilter",
  ],
  methods: {
    getAllPossibleThemeIds() {
      let themeIdCombinations = this.getAllCombinations(
        Object.keys(this.THEMES)
      );

      themeIdCombinations = themeIdCombinations
        .filter((themeIds) => themeIds.length !== 0)
        .map((themeIds) =>
          themeIds.length === 1
            ? themeIds[0]
            : "intersect_" + themeIds.join("_")
        );
      return themeIdCombinations;
    },
    async drawLine(x1, y1, x2, y2) {
      // https://newbedev.com/html-line-drawing-without-canvas-just-js

      if (x2 < x1) {
        var tmp;
        tmp = x2;
        x2 = x1;
        x1 = tmp;
        tmp = y2;
        y2 = y1;
        y1 = tmp;
      }

      var lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      var m = (y2 - y1) / (x2 - x1);

      var degree = (Math.atan(m) * 180) / Math.PI;

      const lineHtml =
        "<div class='line' style='transform-origin: top left; transform: rotate(" +
        degree +
        "deg); width: " +
        lineLength +
        "px; height: 1px; background: rgba(0,0,0,0.3); position: absolute; top: " +
        y1 +
        "px; left: " +
        x1 +
        "px;'></div>";
      $("body").append(lineHtml);
      $(".line")
        .hide()
        .fadeIn(400, function () {});
    },
    getLineTimeFunnelPositions() {
      const timesliderHandleElems = $(".vue-slider-dot");
      const timesliderHandlePositions = [
        timesliderHandleElems[0].getBoundingClientRect(),
        timesliderHandleElems[1].getBoundingClientRect(),
      ];

      const timeFunnelBounds = document
        .querySelector("#time-funnel-img")
        .getBoundingClientRect();

      const timeFunnelLinePositions = [];

      for (const timesliderHandlePos of timesliderHandlePositions) {
        const yValue = timesliderHandlePos.top;
        const xOffset = (timeFunnelBounds.bottom - yValue) / 1.6;
        const timeFunnelLinePos = {
          x: timeFunnelBounds.right + 30 - xOffset,
          y: yValue,
        };
        timeFunnelLinePositions.push(timeFunnelLinePos);
      }

      return timeFunnelLinePositions;
    },
    drawLineBetweenThemeSelectAndTimeFunnel() {
      if (this.draggingTimeFilter) {
        $(".line").remove();
        return;
      }

      const themeSelectElem = document.querySelector("#blobs-img");
      const themeSelectBounds = themeSelectElem.getBoundingClientRect();

      const timeFunnelPositions = this.getLineTimeFunnelPositions();

      const linesState =
        JSON.stringify(timeFunnelPositions) + JSON.stringify(themeSelectBounds);
      const linesAreUnchanged = linesState === this.linesState;
      if (linesAreUnchanged) {
        return;
      }

      this.linesState = linesState;

      $(".line").remove();

      for (const timeFunnelPos of timeFunnelPositions) {
        this.drawLine(
          themeSelectBounds.left,
          themeSelectBounds.top + themeSelectElem.clientHeight / 2,
          timeFunnelPos.x,
          timeFunnelPos.y
        );
      }
    },
    onUpdateTimeFilter(data, handleIdx) {
      this.updateTimeFilter(data[0], data[1]);
    },
    onEndDraggingTimeFilter(handleIdx) {},
    initializeImageMap() {
      $("area").each((index, area) => {
        const themeId = $(area).attr("title");
        const themeTitle = this.getThemeTitle(themeId);
        $(area)
          .attr("title", themeTitle)
          .attr("alt", themeTitle)
          .attr("name", themeId);
      });

      // TODO: Wait for image to be fully loaded
      setTimeout(() => {
        $("img[usemap]").mapster({
          stroke: true,
          strokeWidth: 2.5,
          strokeColor: "000000",
          strokeOpacity: 0.3,
          fill: true,
          fillColor: "000000",
          fillOpacity: 0.2,
          onClick: (e) => {
            const themeId = e.key;
            this.selectTheme(themeId);
            return false;
          },
          mapKey: "name",
          listKey: "name",
        });
      }, 2000);
    },
    initializeLineDrawing() {
      setInterval(() => {
        this.drawLineBetweenThemeSelectAndTimeFunnel();
      }, 250);
    },
  },
  mounted() {
    this.updateTimeFilter(this.minDateTimeSlider, this.maxDateTimeSlider);
    this.initializeImageMap();
    this.initializeLineDrawing();
  },
};
</script>

<style>
#blobs-img {
  width: 100%;
}
#time-funnel-img {
  height: 300px;
}
.vue-slider-dot-tooltip-inner {
  background-color: rgba(52, 152, 219, 0.75) !important;
  border-color: rgb(52, 152, 219, 0.75) !important;
}
.timeslider-container {
  padding-left: 10px;
}
#timeslider-caption {
  position: absolute;
  top: 175px;
  left: 5px;
  transform-origin: 0;
  transform: rotate(-90deg);
  width: 300px;
  font-size: 1em;
}
.theme-select-annotation-text {
  text-align: center;
  font-size: 0.7em;
}
</style>