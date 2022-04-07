import gtmStyler from "react-cismap/topicmaps/generic/GTMStyler";
import { appModes } from "./modeParser";
import Color from "color";
import { getClusterIconCreatorFunction } from "react-cismap/tools/uiHelper";

const selectionColor = new Color("#2664D8");
const getKlimaOrtkarteStyler = (
  svgSize = 24,
  colorizer = (props) => props.color,
  appMode,
  secondarySelection
) => {
  const styler = (feature) => {
    let returningStyle;
    if (appMode === undefined || feature === undefined) {
      console.log("returned style empty");
      return {};
    }
    if (appMode === appModes.ORTE) {
      const style = gtmStyler(svgSize, colorizer, appMode)(feature);
      // console.log("returned style 0", style);

      returningStyle = style;
    } else {
      //in ROUTEN Mode
      let color = getColorConsideringSeondarySelection(feature.properties, secondarySelection);
      let radius = svgSize / 2; //needed for the Tooltip Positioning

      if (feature.geometry.type !== "Point") {
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

          returningStyle = style;
        } else {
          let style;
          if (feature.properties.typ === "route") {
            // color = new Color("#92BE4D");
            style = {
              radius,
              fillColor: color,
              color: color.darken(0.5),
              opacity: 1,
              fillOpacity: 0.8,

              weight: 1,
            };
          } else if (feature.properties.typ === "blickfeld") {
            // color = new Color("#00000040");

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

          returningStyle = style;
        }
      } else {
        const c = getColorConsideringSeondarySelection(feature.properties, secondarySelection);
        const style = gtmStyler(svgSize, () => c, appMode)(feature);
        // console.log("returned style 3", style);
        returningStyle = style;
      }
    }

    if (returningStyle === undefined) {
      console.log("xxx no returning style", feature);
    }

    return returningStyle;
  };
  return styler;
};

export default getKlimaOrtkarteStyler;

export const getColorConsideringSeondarySelection = (props, secondarySelection) => {
  let color = new Color("red");
  if (props.typ === "route") {
    color = new Color("#92BE4D");
    if (secondarySelection.id !== props.id) {
      color = color.grayscale();
    }
  } else if (props.typ === "ort") {
    color = new Color(props.color);
    console.log("props.routen", props.routen);
    console.log(
      "props.routen.filter",
      props.routen.filter((r) => r.id === secondarySelection.id)
    );
    if (props.routen.filter((r) => r.id === secondarySelection.id).length === 0) {
      color = color.grayscale();
    }
  } else if (props.typ === "aussichtspunkt") {
    console.log("xxx props", props);
    //aussichtspunkt
    color = new Color("#655756");
    if (props.routen.filter((r) => r.id === secondarySelection.id).length === 0) {
      color = color.grayscale();
    }
  } else if (props.typ === "blickfeld") {
    color = new Color("#00000040");
  }
  return color;
};
