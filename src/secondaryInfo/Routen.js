import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import SecondaryInfoPanelSection from "react-cismap/topicmaps/SecondaryInfoPanelSection";
import SecondaryInfo from "react-cismap/topicmaps/SecondaryInfo";
import Footer from "./Footer";

import { Col, Descriptions, Timeline } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faRoute,
  faWalking,
  faPlay,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
const productionMode = process.env.NODE_ENV === "production";

const InfoPanel = () => {
  const { selectedFeature, items } = useContext(FeatureCollectionContext);

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
  subsections.push(
    <SecondaryInfoPanelSection
      key="hoehenprofil"
      header="Höhenprofil"
      bsStyle="success"
    >
      <div></div>
    </SecondaryInfoPanelSection>
  );

  const routenverlauf4Timeline = [
    {
      dot: <FontAwesomeIcon icon={faPlay} />,
      // label: "0 m",
      children: "Startpunkt",
    },
  ];

  for (const zwischenstop of item.routenpunkte || []) {
    routenverlauf4Timeline.push({
      label: Math.round(zwischenstop.station / 100) * 100 + " m",
      children: zwischenstop.name,
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
