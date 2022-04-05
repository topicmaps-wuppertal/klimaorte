import gtmStyler from "react-cismap/topicmaps/generic/GTMStyler";
import { appModes } from "./modeParser";
import Color from "color";

const selectionColor = new Color("#2664D8");
const getKlimaOrtkarteStyler = (svgSize = 24, colorizer = (props) => props.color, appMode) => {
  // console.log("tttt appMode", appMode);

  //   return gtmStyler(svgSize, colorizer);

  const styler = (feature) => {
    // console.log("in styler: feature, appMode", feature, appMode);
    if (appMode === undefined || feature === undefined) {
      console.log("returned style empty");
      return {};
    }
    if (appMode === appModes.ORTE) {
      const style = gtmStyler(svgSize, colorizer, appMode)(feature);
      // console.log("returned style 0", style);

      return style;
    } else {
      var color = new Color(colorizer(feature.properties));
      let radius = svgSize / 2; //needed for the Tooltip Positioning

      if (feature.geometry.type !== "Point") {
        //set color according to type of feature
        // console.log("feature.properties.typ", feature.properties.typ);

        if (feature.properties.typ === "route") {
          color = new Color("#92BE4D");
        } else if (feature.properties.typ === "aussichtspunkt") {
          color = new Color("#00000040");
        }

        if (feature.selected === true) {
          color = selectionColor;
          const style = {
            radius,
            fillColor: color,
            color: color.darken(0.01),
            opacity: 1,
            fillOpacity: 0.8,

            weight: 3,
          };
          // console.log("returned style 1", style);

          return style;
        } else {
          let style;
          if (feature.properties.typ === "route") {
            color = new Color("#92BE4D");
            style = {
              radius,
              fillColor: color,
              color: color.darken(0.5),
              opacity: 1,
              fillOpacity: 0.8,

              weight: 1,
            };
          } else if (feature.properties.typ === "aussichtspunkt") {
            color = new Color("#00000040");

            style = {
              radius,
              fillColor: color,
              color: color,
              opacity: 0.8,
              fillOpacity: 0.8,

              weight: 0,
            };
          } else if (feature.properties.typ === "ort") {
            style = gtmStyler(svgSize, colorizer, appMode)(feature);
          } else {
            // console.log("what else ", feature);
          }
          // console.log("returned style 2", style);

          return style;
        }
      } else {
        const style = gtmStyler(svgSize, colorizer, appMode)(feature);
        // console.log("returned style 3", style);
        return style;
      }
    }
  };
  return styler;
};

export default getKlimaOrtkarteStyler;
