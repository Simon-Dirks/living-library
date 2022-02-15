import $ from "jquery";
import { lineDrawingMixin } from "@/mixins/lineDrawingMixin";

export default {
  drawLineBetweenThemeSelectAndTimeFunnel: async (context) => {
    const lineElems = $(".line");
    // if (this.draggingTimeFilter) {
    //   lineElems.remove();
    //   return;
    // }

    const themeSelectElem = document.querySelector("#blobs-img");
    const themeSelectBounds = themeSelectElem.getBoundingClientRect();

    const timeFunnelPositions =
      lineDrawingMixin.methods.getLineTimeFunnelPositions();

    const linesState =
      JSON.stringify(timeFunnelPositions) + JSON.stringify(themeSelectBounds);
    const linesAreUnchanged = linesState === context.getters["getLinesState"];
    if (linesAreUnchanged) {
      return;
    }

    context.commit("updateLinesState", linesState);

    lineElems.remove();

    for (const timeFunnelPos of timeFunnelPositions) {
      lineDrawingMixin.methods.drawLine(
        themeSelectBounds.left - 10,
        themeSelectBounds.top + themeSelectElem.clientHeight / 2,
        timeFunnelPos.x,
        timeFunnelPos.y
      );
    }
  },
};
