import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import SecondaryInfoPanelSection from "react-cismap/topicmaps/SecondaryInfoPanelSection";
import SecondaryInfo from "react-cismap/topicmaps/SecondaryInfo";
import Footer from "./Footer";
import SVGInline from "react-svg-inline";

import { Descriptions, Timeline } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faRoute,
  faWalking,
  faPlay,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import ElevationChart from "./ElevationChart";
import { getSymbolSVGGetter } from "react-cismap/tools/uiHelper";

const productionMode = process.env.NODE_ENV === "production";

const InfoPanel = () => {
  const { selectedFeature, items, allFeatures, itemsDictionary } = useContext(
    FeatureCollectionContext
  );

  const item = selectedFeature?.properties;

  let iconV;
  switch (item?.wegeart) {
    case "mit dem Rad":
      iconV = faBicycle;
      break;
    case "zu Fuß":
      iconV = faWalking;
      break;
    default:
      iconV = faRoute;
      break;
  }

  const subsections = [];

  const elevationData = {};
  let i = 0;
  for (const station of item.stations || []) {
    elevationData[Math.round(station)] = item.zvals[i++];
  }

  subsections.push(
    <SecondaryInfoPanelSection
      key="hoehenprofil"
      header="Höhenprofil"
      bsStyle="success"
    >
      <ElevationChart elevationData={elevationData} />
    </SecondaryInfoPanelSection>
  );

  const routenverlauf4Timeline = [
    {
      dot: <FontAwesomeIcon icon={faPlay} />,
      // label: "0 m",
      children: "Startpunkt",
    },
  ];
  console.log("yy allFeatures", allFeatures);

  for (const routenpunkt of item.routenpunkte || []) {
    let typ;
    let id;
    let dot = [];
    let dotPadding = 0;
    if (routenpunkt.typ === "klimaort") {
      const angebote = itemsDictionary.angeboteInStandorte[routenpunkt.id];
      let counter = 0;
      for (const angebotId of angebote || []) {
        console.log("yy angebotId", angebotId, "for", routenpunkt.id);
        const feature4Punkt = allFeatures.find(
          (f) => f.properties.id === angebotId && f.featuretype === "ort"
        );
        console.log("yy ", routenpunkt.name, feature4Punkt);

        dot.push(
          getSymbolSVGGetter(
            feature4Punkt?.properties?.svgBadge,
            feature4Punkt?.properties?.svgBadgeDimension
          )(25, feature4Punkt?.properties.color, "angebot_" + angebotId)
        );
        dotPadding += 12;
      }
    } else {
      //handelt zwischenstopps &  pois
      const feature4Punkt = allFeatures.find(
        (f) =>
          f.properties.id === routenpunkt.id &&
          f.featuretype === routenpunkt.typ
      );
      console.log(
        "yy zwischenstopp or poi",
        feature4Punkt?.properties.color,
        feature4Punkt
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
      console.log(
        'y_y routenpunkt.typ + "." + routenpunkt.id',
        routenpunkt.typ +
          "." +
          routenpunkt.id +
          "." +
          feature4Punkt?.properties.color,
        dot
      );
    }

    // console.log("yy routenpunkt", routenpunkt, feature4Punkt);

    routenverlauf4Timeline.push({
      label: (
        <span style={{ paddingRight: dot.length * 13 }}>
          {Math.round(routenpunkt.station / 100) * 100 + " m"}
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

  subsections.push(
    <SecondaryInfoPanelSection
      key="routenverlauf"
      header="Routenverlauf"
      bsStyle="info"
    >
      <div>
        <Timeline mode="left" items={routenverlauf4Timeline} />
      </div>
    </SecondaryInfoPanelSection>
  );
  if (!productionMode) {
    subsections.push(
      <SecondaryInfoPanelSection
        key="json"
        header="Rohdaten"
        bsStyle="default"
        collapsedOnStart={true}
      >
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </SecondaryInfoPanelSection>
    );
  }
  return (
    <SecondaryInfo
      titleIconName="info-circle"
      title={
        <span>
          Klimaroute: {item.name} <FontAwesomeIcon icon={iconV} />{" "}
        </span>
      }
      mainSection={
        <div
          style={{
            width: "100%",
            fontSize: "115%",
            padding: "10px",
          }}
        >
          {item.beschreibung && <p>{item.beschreibung}</p>}
          <Descriptions bordered>
            <Descriptions.Item label="Dauer">
              {item.dauer} Stunden
            </Descriptions.Item>
            <Descriptions.Item label="Länge">
              {item.distanz} km
            </Descriptions.Item>
            <Descriptions.Item label="Schwierigkeitsgrad">
              {item.schwierigkeitsgrad}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ padding: 20, paddingLeft: 0 }}>
            <span>Routeninformation in Zusammenarbeit mit </span>
            <a target="komoot" href={item.url}>
              <img
                height="30"
                alt="Komoot"
                src="/logo_komoot_green_RGB_v2-1.svg"
              />
            </a>
          </div>
        </div>
      }
      footer={<Footer />}
      subSections={subsections}
    />
  );
};
export default InfoPanel;
