import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";

import { Timeline } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { getSymbolSVGGetter } from "react-cismap/tools/uiHelper";
import "./verlauf.css";
export default function Verlauf() {
  const { selectedFeature, items, allFeatures, itemsDictionary } = useContext(
    FeatureCollectionContext
  );
  const item = selectedFeature?.properties;

  const routenverlauf4Timeline = [
    {
      dot: <FontAwesomeIcon icon={faPlay} />,
      // label: "0 m",
      children: "Startpunkt",
    },
  ];

  for (const routenpunkt of item.routenpunkte || []) {
    let dot = [];
    if (routenpunkt.typ === "klimaort") {
      const angebote = itemsDictionary.angeboteInStandorte[routenpunkt.id];
      for (const angebotId of angebote || []) {
        const feature4Punkt = allFeatures.find(
          (f) => f.properties.id === angebotId && f.featuretype === "ort"
        );

        dot.push(
          getSymbolSVGGetter(
            feature4Punkt?.properties?.svgBadge,
            feature4Punkt?.properties?.svgBadgeDimension
          )(25, feature4Punkt?.properties.color, "angebot_" + angebotId)
        );
      }
    } else {
      //handelt zwischenstopps &  pois
      const feature4Punkt = allFeatures.find(
        (f) =>
          f.properties.id === routenpunkt.id &&
          f.featuretype === routenpunkt.typ
      );

      dot = [
        getSymbolSVGGetter(
          feature4Punkt?.properties?.svgBadge,
          feature4Punkt?.properties?.svgBadgeDimension
        )(
          25,
          feature4Punkt?.properties.color,
          "badgefor_" + routenpunkt.typ + "_" + routenpunkt.id
        ),
      ];
    }

    // console.log("yy routenpunkt", routenpunkt, feature4Punkt);

    routenverlauf4Timeline.push({
      label: (
        <span style={{ paddingRight: dot.length * 13 }}>
          {(Math.round(routenpunkt.station / 100) * 100).toLocaleString() +
            " m"}
        </span>
      ),
      children: (
        <span style={{ paddingLeft: dot.length * 13 }}>{routenpunkt.name}</span>
      ),
      dot,
    });
  }

  routenverlauf4Timeline.push({
    //label: "x m",
    dot: <FontAwesomeIcon icon={faFlagCheckered} />,
    children: "Zielpunkt",
  });
  return (
    <div className="timeline_container">
      <Timeline mode="left" items={routenverlauf4Timeline} />
    </div>
  );
}
