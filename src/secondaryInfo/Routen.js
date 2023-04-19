import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import SecondaryInfoPanelSection from "react-cismap/topicmaps/SecondaryInfoPanelSection";
import SecondaryInfo from "react-cismap/topicmaps/SecondaryInfo";
import Footer from "./Footer";

import { Descriptions } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBicycle,
  faRoute,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";
import ElevationChart from "./ElevationChart";
import Verlauf from "./Verlauf";
import { ResponsiveTopicMapContext } from "react-cismap/contexts/ResponsiveTopicMapContextProvider";

const productionMode = process.env.NODE_ENV === "production";

const InfoPanel = () => {
  const { selectedFeature, items, allFeatures, itemsDictionary } = useContext(
    FeatureCollectionContext
  );
  const { windowSize } = useContext(ResponsiveTopicMapContext);

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
  const routePoints = {};
  let i = 0;
  for (const station of item.stations || []) {
    elevationData[Math.round(station)] = { z: item.zvals[i++] };
  }

  // add routepoints
  // console.log("# routepoints", item.routenpunkte.length);
  // console.log("# stations", item.stations.length);
  for (const rp of item.routenpunkte || []) {
    //check if station is already in elevationData
    if (elevationData[Math.round(rp.station)]) {
      elevationData[Math.round(rp.station)].routepoint = rp;
    } else {
      elevationData[Math.round(rp.station)] = { routepoint: rp };
    }
  }
  // attention: the elevationData is not sorted by station

  subsections.push(
    <ElevationChart
      key={"ElevationChart" + item.id + "." + windowSize.width}
      elevationData={elevationData}
      routePoints={routePoints}
    />
  );

  subsections.push(<Verlauf />);
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
          <Descriptions
            bordered
            column={{
              xxl: 3,
              xl: 3,
              lg: 3,
              md: 1,
              sm: 1,
              xs: 1,
            }}
          >
            <Descriptions.Item label="Dauer">
              <span style={{ whiteSpace: "nowrap" }}>{item.dauer} Stunden</span>
            </Descriptions.Item>
            <Descriptions.Item label="Länge">
              <span style={{ whiteSpace: "nowrap" }}>{item.distanz} km</span>
            </Descriptions.Item>
            <Descriptions.Item label="Schwierigkeitsgrad">
              <span style={{ whiteSpace: "nowrap" }}>
                {item.schwierigkeitsgrad}
              </span>
            </Descriptions.Item>
          </Descriptions>
          <div style={{ padding: 20, paddingLeft: 0 }}>
            <span>Routeninformation in Zusammenarbeit mit </span>
            <a target="komoot" href={item.url}>
              <img
                height="30"
                alt="Komoot"
                src="/logo_komoot_green_h30.png"
                // src="/logo_komoot_green_RGB_v2-1.svg"
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
