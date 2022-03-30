import { appModes } from "./modeParser";

const itemFilterFunction = ({ filterState, filterMode, appMode, itemsDictionary }) => {
  console.log("itemsDictionary", itemsDictionary);

  const ortFilter = (item) => {
    if (filterMode === "themen") {
      return filterState?.themen?.includes(item?.thema?.id);
    } else if (filterMode === "kategorien") {
      for (const cat of item.kategorien || []) {
        if (filterState?.kategorien?.includes(cat)) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };

  if (filterMode) {
    if (appMode === appModes.ORTE) {
      return (item) => {
        if (item.typ === "ort") {
          return ortFilter(item);
        } else {
          //Routen werden rausgefiltert
          return false;
        }
      };
    } else {
      return (item) => {
        if (item.typ === "route") {
          return true;
        } else {
          if (item.standort.geojson.type === "Point") {
            return ortFilter(item) && itemsDictionary.orteInRouten.includes(item.standort.id);
          } else {
            //Orte die keine Punkte sind werden rausgefiltert
            return false;
          }
        }
      };
    }
  } else {
    return () => true;
  }
};
export default itemFilterFunction;
