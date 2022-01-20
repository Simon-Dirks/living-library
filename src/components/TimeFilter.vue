<template>
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
      v-on:change="updateTimeFilter({ min: $event[0], max: $event[1] })"
      v-on:drag-start="draggingTimeFilter = true"
      v-on:drag-end="draggingTimeFilter = false"
    >
      <!-- <template v-slot:tooltip="{ value }">
        <div class="custom-tooltip">{{ timestampToDate(value) }}</div>
      </template> -->
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import { mapMutations } from "vuex";
import { dateMixin } from "@/mixins/dateMixin";
import "vue-slider-component/theme/default.css";

export default {
  name: "TimeFilter",
  mixins: [dateMixin],
  components: { VueSlider },
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
    };
  },
  methods: {
    ...mapMutations({
      updateTimeFilter: "timeFilter/update",
    }),
  },
  mounted() {
    this.updateTimeFilter({
      min: this.minDateTimeSlider,
      max: this.maxDateTimeSlider,
    });
  },
};
</script>

<style>
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
</style>
