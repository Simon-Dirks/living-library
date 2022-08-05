// import { Config } from "@/config";
// import $ from "jquery";
//
// export const lineDrawingMixin = {
//   methods: {
//     async drawLine(x1, y1, x2, y2) {
//       // https://newbedev.com/html-line-drawing-without-canvas-just-js
//
//       if (x2 < x1) {
//         let tmp;
//         tmp = x2;
//         x2 = x1;
//         x1 = tmp;
//         tmp = y2;
//         y2 = y1;
//         y1 = tmp;
//       }
//
//       let lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
//       let m = (y2 - y1) / (x2 - x1);
//
//       let degree = (Math.atan(m) * 180) / Math.PI;
//
//       const lineHtml =
//         "<div class='line' style='transform-origin: top left; transform: rotate(" +
//         degree +
//         "deg); width: " +
//         lineLength +
//         `px; height: 2px; background: ${Config.LINE_COLOR}; position: absolute; top: ` +
//         y1 +
//         "px; left: " +
//         x1 +
//         "px;'></div>";
//       $("body").append(lineHtml);
//       // $(".line")
//       //   .hide()
//       //   .fadeIn(400, function () {});
//     },
//     getLineTimeFunnelPositions() {
//       const timesliderHandleElems = $(".vue-slider-dot");
//       const timesliderHandlePositions = [
//         timesliderHandleElems[0].getBoundingClientRect(),
//         timesliderHandleElems[1].getBoundingClientRect(),
//       ];
//
//       const timeFunnelBounds = document
//         .querySelector("#time-funnel-img")
//         .getBoundingClientRect();
//
//       const timeFunnelLinePositions = [];
//
//       for (const timesliderHandlePos of timesliderHandlePositions) {
//         const yValue = timesliderHandlePos.top;
//         const xOffset = (timeFunnelBounds.bottom - yValue) / 3.15;
//         const timeFunnelLinePos = {
//           x: Math.round(timeFunnelBounds.right + 40 - xOffset),
//           y: Math.round(yValue),
//         };
//         timeFunnelLinePositions.push(timeFunnelLinePos);
//       }
//
//       return timeFunnelLinePositions;
//     },
//   },
// };
