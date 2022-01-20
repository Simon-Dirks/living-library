import $ from "jquery";
import Config from "@/config";

export const imageMapMixin = {
  methods: {
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
            updatedCoords.push(coordInt + Config.IMAGEAREAOFFSET.xOffset);
          } else {
            updatedCoords.push(coordInt + Config.IMAGEAREAOFFSET.yOffset);
          }
        }
        $(area).attr("coords", updatedCoords.join(","));
      });

      const imageToMap = $("img[usemap]");
      imageToMap
        .one("load", () => {
          // TODO: Replace dirty fix for initializing map at the right moment
          setTimeout(() => {
            imageToMap.mapster({
              stroke: true,
              strokeWidth: 2.5,
              strokeColor: "000000",
              strokeOpacity: 0.3,
              fill: true,
              fillColor: "000000",
              fillOpacity: 0.2,
              onClick: (e) => {
                const themeId = e.key;
                this.toggleTheme(themeId);
                return false;
              },
              mapKey: "name",
              listKey: "name",
            });
          }, 1000);
        })
        .each(function () {
          if (this.complete) {
            $(this).trigger("load");
          }
        });
    },
  },
};
