import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import Orte from "./secondaryInfo/Orte";
import Zwischenstopps from "./secondaryInfo/Zwischenstopps";

const InfoPanel = () => {
  const { selectedFeature } = useContext(FeatureCollectionContext);

  const item = selectedFeature?.properties;

  switch (item?.typ) {
    case "ort":
      return <Orte />;
    case "zwischenstopp":
      return <Zwischenstopps />;
    default:
      return null;
  }
};
export default InfoPanel;
