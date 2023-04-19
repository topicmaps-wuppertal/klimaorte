import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
// import SecondaryInfoPanelSection from "react-cismap/topicmaps/SecondaryInfoPanelSection";
import SecondaryInfoPanelSection from "./SecondaryInfoPanelSection";

import { Timeline } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { getSymbolSVGGetter } from "react-cismap/tools/uiHelper";
import "./verlauf.css";
import { ResponsiveTopicMapContext } from "react-cismap/contexts/ResponsiveTopicMapContextProvider";

export default function Verlauf() {
  const { selectedFeature, items, allFeatures, itemsDictionary } = useContext(
    FeatureCollectionContext
  );

  const { windowSize } = useContext(ResponsiveTopicMapContext);

  console.log("windowSize", windowSize);
  const item = selectedFeature?.properties;
  let timeline;
  const routenverlauf4Timeline = [
    {
      dot: <FontAwesomeIcon icon={faPlay} />,
      // label: "0 m",
      children: "Startpunkt",
    },
  ];
  let maxDotLength = 0;
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
          )(24, feature4Punkt?.properties.color, "angebot_" + angebotId)
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
          24,
          feature4Punkt?.properties.color,
          "badgefor_" + routenpunkt.typ + "_" + routenpunkt.id
        ),
      ];
    }

    maxDotLength = Math.max(maxDotLength, dot.length);
    // console.log("yy routenpunkt", routenpunkt, feature4Punkt);

    if (windowSize.width < 500) {
      routenverlauf4Timeline.push({
        children: (
          <div
            style={{
              _border: "1px solid red",
              paddingLeft: (dot.length - 1) * 12,
            }}
          >
            <b>
              {(Math.round(routenpunkt.station / 100) * 100).toLocaleString() +
                " m"}
            </b>
            {": "}
            {routenpunkt.name}{" "}
          </div>
        ),

        dot,
      });
    } else {
      routenverlauf4Timeline.push({
        label: (
          <div
            style={{
              paddingRight: (dot.length - 1) * 12,
              whiteSpace: "nowrap",
            }}
          >
            {(Math.round(routenpunkt.station / 100) * 100).toLocaleString() +
              " m"}
          </div>
        ),
        children: (
          <div style={{ paddingLeft: (dot.length - 1) * 12 }}>
            {routenpunkt.name}
          </div>
        ),
        dot,
      });
    }
  }

  routenverlauf4Timeline.push({
    dot: <FontAwesomeIcon icon={faFlagCheckered} />,
    children: "Zielpunkt",
  });

  if (windowSize.width < 500) {
    timeline = (
      <div className="left_oriented_timeline_container_without_labels">
        <Timeline
          colorBgContainer="#ff0000"
          mode="left"
          items={routenverlauf4Timeline}
          style={{ padding: 5, paddingLeft: maxDotLength * 12 }}
        />
      </div>
    );
  } else {
    timeline = (
      <div className="left_oriented_timeline_container_with_content_on_both_sides">
        <Timeline mode="left" items={routenverlauf4Timeline} />
      </div>
    );
  }

  return (
    <SecondaryInfoPanelSection
      key="routenverlauf"
      header="Routenverlauf"
      bsStyle="info"
    >
      <div>{timeline}</div>
    </SecondaryInfoPanelSection>
  );
}
