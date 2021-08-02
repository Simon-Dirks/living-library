<template>
  <ion-grid class="ion-margin-top">
    <ion-row>
      <ion-col size="1">
        <div class="timeslider-container">
          <h3 id="timeslider-caption">Flow of time &#8594;</h3>

          <vue-slider
            v-model="sliderValue"
            direction="btt"
            height="450px"
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
      <ion-col size="11">
        <img
          src="@/assets/img/time-funnel.png"
          alt="Time funnel"
          id="time-funnel-img"
        />

        <div class="theme-select-blobs-container ion-margin-top">
          <img
            src="@/assets/img/blobs.png"
            usemap="#image-map"
            id="blobs-img"
          />

          <map name="image-map">
            <area
              target=""
              alt="academicAchievementAssessment"
              title="academicAchievementAssessment"
              href=""
              coords="257,982,277,975,307,961,329,955,352,955,369,952,391,952,411,955,434,956,452,958,472,951,491,945,510,938,528,929,547,923,561,912,576,900,587,892,603,880,615,863,622,849,628,829,639,807,648,793,661,778,676,765,695,750,714,735,732,727,747,715,758,704,768,692,781,681,800,669,819,656,843,640,856,628,869,615,886,597,905,584,918,573,931,562,946,546,961,534,948,570,936,589,922,605,912,628,900,648,889,674,879,698,872,721,865,742,859,768,853,794,853,814,852,840,852,865,856,890,860,919,869,942,879,974,888,1002,893,1027,898,1053,898,1074,898,1100,898,1123,895,1152,890,1182,885,1205,875,1235,867,1258,854,1285,842,1308,829,1330,814,1351,797,1367,786,1382,778,1394,767,1406,750,1425,728,1439,705,1452,678,1459,648,1469,609,1469,577,1468,544,1468,513,1468,487,1468,464,1471,431,1469,402,1469,373,1471,345,1466,322,1462,296,1461,270,1458,247,1453,227,1443,210,1432,191,1420,175,1402,158,1383,135,1363,119,1343,103,1320,96,1292,90,1264,90,1229,100,1203,103,1176,112,1145,123,1114,139,1080,158,1054,181,1033,204,1012,231,994"
              shape="poly"
            />
            <area
              target=""
              alt="teachingPractice"
              title="teachingPractice"
              href=""
              coords="396,912,381,885,371,855,358,809,355,769,355,730,355,678,354,641,358,611,368,582,376,553,390,523,410,483,434,449,466,398,506,355,542,319,594,281,630,243,679,204,720,180,771,160,831,148,867,137,914,130,967,117,1003,111,1076,105,1131,107,1212,113,1265,126,1312,136,1351,150,1400,164,1456,197,1497,232,1533,273,1563,301,1595,350,1612,384,1617,418,1617,459,1617,492,1615,536,1615,568,1615,607,1599,632,1562,663,1525,686,1490,707,1434,721,1384,723,1318,732,1265,734,1219,747,1170,757,1144,766,1118,783,1095,806,1071,845,1053,872,1041,895,1031,921,1005,958,970,989,939,1009,918,1027,895,1046,875,1065,828,1085,772,1096,725,1112,670,1105,624,1091,587,1072,546,1047,518,1025,483,1000,452,976,423,947"
              shape="poly"
            />
            <area
              target=""
              alt="affect"
              title="affect"
              href=""
              coords="65,950,63,902,79,809,115,729,158,670,185,643,214,611,238,588,267,562,303,546,352,528,396,516,462,512,529,505,585,503,635,516,676,528,748,549,795,574,848,610,891,641,924,680,993,749,1042,858,1056,924,1057,1004,1036,1089,1010,1155,976,1193,954,1220,927,1242,881,1271,820,1313,664,1341,507,1333,323,1280,266,1238,142,1119,94,1040"
              shape="poly"
            />
            <area
              target=""
              alt="contextTeaching"
              title="contextTeaching"
              href=""
              coords="612,1191,625,1249,662,1318,708,1379,764,1430,859,1463,939,1471,1041,1466,1112,1468,1201,1465,1277,1463,1342,1458,1396,1426,1445,1402,1500,1363,1536,1328,1561,1284,1574,1235,1604,1192,1617,1146,1619,1097,1619,1053,1623,1010,1622,936,1622,873,1625,817,1619,763,1619,698,1623,646,1620,582,1620,526,1622,472,1617,424,1617,409,1609,372,1586,332,1564,307,1528,287,1434,281,1365,287,1270,306,1204,330,1145,363,1061,416,1016,467,974,521,947,553,911,610,883,639,862,682,845,712,813,760,774,836,730,893,700,955,675,1027,652,1070,629,1120"
              shape="poly"
            />
            <area
              target=""
              alt="equity"
              title="equity"
              href=""
              coords="141,277,182,247,243,217,305,201,348,194,396,171,467,154,529,144,595,141,658,145,715,159,783,182,852,223,915,261,971,309,1013,358,1050,395,1086,468,1100,534,1102,603,1089,652,1064,711,1001,757,961,788,891,816,807,850,700,862,586,862,480,853,392,847,317,849,233,823,182,806,138,770,80,730,37,668,14,618,3,557,10,501,27,444,43,401,75,355,98,319,119,297"
              shape="poly"
            />
          </map>

          <p class="theme-select-annotation-text">
            <em
              >Cross-section showing intertwined conversation themes running
              through top 50 Clarivate journals</em
            >
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
        const xOffset = (timeFunnelBounds.bottom - yValue) / 1.9;
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
  height: 450px;
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
  top: 250px;
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
.theme-select-blobs-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
}
</style>