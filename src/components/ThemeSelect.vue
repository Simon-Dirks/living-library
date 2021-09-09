<template>
  <ion-grid class="ion-margin-top">
    <ion-row>
      <ion-col size="1">
        <div class="timeslider-container">
          <h3 id="timeslider-caption">Flow of time &#8594;</h3>

          <vue-slider
            v-model="sliderValue"
            direction="btt"
            height="80vh"
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
      <ion-col size="6">
        <img
          src="@/assets/img/time-funnel_v2.png"
          alt="Time funnel"
          id="time-funnel-img"
        />
      </ion-col>
      <!--      <ion-col size="1"></ion-col>-->
      <ion-col size="5">
        <div class="theme-select-blobs-container ion-margin-top">
          <img
            src="@/assets/img/blobs_v4.png"
            usemap="#image-map"
            id="blobs-img"
          />

          <map name="image-map">
            <area
              target=""
              alt="equity"
              title="equity"
              href=""
              coords="44,328,64,293,88,258,116,224,148,191,183,161,227,130,278,102,338,71,404,45,470,27,537,15,598,16,659,21,724,37,784,58,848,94,901,137,943,185,980,247,1012,321,1032,393,1039,463,1036,532,1032,588,1019,643,1001,695,982,739,957,785,926,829,894,866,865,897,833,927,801,952,769,976,736,999,707,1022,682,1045,654,1071,631,1098,614,1124,599,1156,590,1189,587,1216,586,1248,590,1277,598,1303,608,1327,622,1349,638,1367,660,1384,683,1395,707,1401,733,1400,761,1395,789,1385,818,1369,851,1350,879,1327,903,1304,922,1283,941,1260,944,1282,943,1306,934,1332,925,1359,908,1392,890,1421,869,1452,844,1483,815,1514,779,1544,733,1570,681,1587,627,1597,571,1595,518,1582,469,1557,428,1526,390,1482,359,1440,333,1393,313,1347,297,1304,285,1257,274,1206,269,1167,268,1123,269,1075,273,1027,283,980,297,934,319,888,347,845,371,809,402,770,425,729,439,689,451,634,450,582,436,540,413,508,388,483,355,468,315,458,272,452,227,452,178,458,130,474,93,492,74,508,55,526,39,546,28,560,16,586,9,603,7,550,6,504,7,468,11,422,20,386,30,356"
              shape="poly"
            />
            <area
              target=""
              alt="contextTeaching"
              title="contextTeaching"
              href=""
              coords="482,25,530,35,567,48,598,62,631,82,656,99,682,125,703,153,718,187,729,220,736,273,736,311,733,356,721,396,704,439,686,479,667,512,644,547,623,576,592,608,560,639,522,674,490,702,456,732,421,763,389,792,360,819,336,845,311,870,285,899,260,928,229,968,200,1006,171,1054,142,1110,116,1166,103,1214,93,1258,88,1310,87,1364,96,1427,111,1485,133,1537,167,1594,209,1646,259,1687,320,1714,391,1735,455,1746,526,1745,597,1738,670,1715,743,1686,818,1642,890,1592,963,1537,1030,1474,1086,1408,1133,1343,1167,1296,1201,1230,1230,1169,1251,1104,1266,1044,1274,985,1278,925,1279,846,1281,792,1283,735,1282,685,1278,623,1270,559,1258,499,1240,440,1216,383,1191,334,1164,289,1134,246,1107,216,1080,186,1047,160,1015,138,979,117,940,95,902,78,861,64,820,52,780,42,740,33,696,26,658,22,611,17,569,15,527,16"
              shape="poly"
            />
            <area
              target=""
              alt="teachingPractice"
              title="teachingPractice"
              href=""
              coords="6,1088,5,1035,5,993,9,952,14,916,29,874,47,837,67,805,96,775,124,751,164,724,200,706,243,689,294,675,349,663,408,658,456,656,511,658,578,669,640,686,707,712,764,743,817,781,858,817,891,858,908,898,915,941,909,983,893,1018,874,1051,843,1080,807,1108,755,1131,707,1148,658,1165,612,1174,568,1187,532,1205,504,1229,488,1250,475,1275,468,1306,465,1339,473,1375,489,1412,521,1443,563,1465,605,1478,654,1482,698,1477,738,1469,771,1454,802,1435,832,1415,859,1390,883,1367,901,1339,916,1314,928,1288,938,1261,940,1275,938,1299,935,1326,927,1358,918,1384,909,1412,895,1443,881,1477,859,1515,827,1565,793,1609,747,1657,691,1696,624,1726,553,1748,485,1759,411,1758,353,1751,306,1742,253,1724,210,1709,168,1684,131,1654,96,1611,67,1563,48,1514,29,1445,19,1372,13,1302,8,1224,7,1161"
              shape="poly"
            />
            <area
              target=""
              alt="academicAchievementAssessment"
              title="academicAchievementAssessment"
              href=""
              coords="40,1540,50,1570,64,1604,84,1641,112,1674,142,1709,180,1738,221,1767,273,1798,334,1825,407,1849,468,1867,536,1883,585,1892,640,1900,696,1904,749,1904,807,1898,872,1887,928,1871,984,1849,1035,1820,1083,1785,1125,1741,1158,1695,1178,1659,1200,1610,1219,1557,1236,1493,1250,1425,1257,1347,1261,1298,1264,1252,1265,1205,1270,1159,1273,1112,1275,1071,1277,998,1278,951,1269,1018,1259,1057,1239,1106,1221,1153,1200,1201,1165,1258,1126,1312,1088,1359,1051,1407,1009,1445,953,1494,896,1534,832,1573,774,1605,705,1627,628,1653,553,1666,475,1672,389,1670,316,1661,246,1644,183,1617,132,1583,88,1542,61,1503,22,1398,27,1464,33,1509"
              shape="poly"
            />
            <area
              target=""
              alt="affect"
              title="affect"
              href=""
              coords="11,571,33,521,66,475,107,436,155,404,223,377,303,357,399,354,498,367,599,387,681,420,757,462,830,506,903,562,970,620,1032,690,1081,760,1129,841,1174,941,1208,1042,1226,1114,1241,1175,1250,1237,1255,1301,1253,1370,1247,1445,1231,1513,1211,1579,1185,1646,1159,1694,1129,1737,1097,1772,1057,1806,1012,1835,960,1861,895,1881,838,1891,772,1900,859,1867,909,1831,943,1788,965,1738,975,1684,978,1626,956,1567,924,1515,889,1481,840,1448,778,1418,695,1395,630,1377,573,1365,507,1351,439,1336,374,1319,307,1296,246,1268,181,1243,120,1207,76,1165,39,1116,18,1054,6,995,3,911,0,828,1,746,2,678,2,623"
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
      LINECOLOR: "rgba(52, 152, 219, 0.7)",
      IMAGEAREAOFFSET: { xOffset: 110, yOffset: 110 },
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
        `px; height: 2px; background: ${this.LINECOLOR}; position: absolute; top: ` +
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
        const xOffset = (timeFunnelBounds.bottom - yValue) / 2;
        const timeFunnelLinePos = {
          x: timeFunnelBounds.right + 40 - xOffset,
          y: yValue,
        };
        timeFunnelLinePositions.push(timeFunnelLinePos);
      }

      return timeFunnelLinePositions;
    },
    drawLineBetweenThemeSelectAndTimeFunnel() {
      const lineElems = $(".line");
      if (this.draggingTimeFilter) {
        lineElems.remove();
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

      lineElems.remove();

      for (const timeFunnelPos of timeFunnelPositions) {
        this.drawLine(
          themeSelectBounds.left - 10,
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

        const areaCoords = $(area).attr("coords").split(",");
        const updatedCoords = [];
        for (const [coordIdx, coord] of areaCoords.entries()) {
          const isXCoordinate = coordIdx % 2 === 0;
          const coordInt = parseInt(coord);
          if (isXCoordinate) {
            updatedCoords.push(coordInt + this.IMAGEAREAOFFSET.xOffset);
          } else {
            updatedCoords.push(coordInt + this.IMAGEAREAOFFSET.yOffset);
          }
        }
        console.log("First:", $(area).attr("coords"));
        $(area).attr("coords", updatedCoords.join(","));
        console.log("Then:", $(area).attr("coords"));
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
  height: 80vh;
  max-width: 100%;
}

.vue-slider-dot-tooltip-inner {
  background-color: rgba(52, 152, 219, 0.75) !important;
  border-color: rgba(52, 152, 219, 0.75) !important;
}

.timeslider-container {
  padding-left: 10px;
}

#timeslider-caption {
  position: absolute;
  top: 40vh;
  left: 5px;
  transform-origin: 0;
  transform: rotate(-90deg);
  width: 300px;
  font-size: 1em;
}

.theme-select-annotation-text {
  text-align: center;
  font-size: 0.85em;
}

.theme-select-blobs-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
}
</style>
