import { useEffect } from "react";

import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-cismap/topicMaps.css";
import { md5FetchText, fetchJSON } from "react-cismap/tools/fetching";
import { getGazDataForTopicIds } from "react-cismap/tools/gazetteerHelper";

import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import { getClusterIconCreatorFunction } from "react-cismap/tools/uiHelper";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import FeatureCollection from "react-cismap/FeatureCollection";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import getGTMFeatureStyler from "react-cismap/topicmaps/generic/GTMStyler";

import convertBPKlimaItemsToFeature from "./helper/itemConverter";
import InfoPanel from "./SecondaryInfo";
import MyMenu from "./Menu";
import itemFilterFunction from "./helper/filter";

import Icon from "react-cismap/commons/Icon";
import StyledWMSTileLayer from "react-cismap/StyledWMSTileLayer";
import titleFactory from "./helper/titleFactory";
const host = "https://wupp-topicmaps-data.cismet.de";

const getGazData = async (setGazData) => {
  const prefix = "GazDataForStories";
  const sources = {};

  sources.adressen = await md5FetchText(prefix, host + "/data/adressen.json");
  sources.bezirke = await md5FetchText(prefix, host + "/data/bezirke.json");
  sources.quartiere = await md5FetchText(prefix, host + "/data/quartiere.json");
  sources.bpklimastandorte = await md5FetchText(prefix, host + "/data/bpklimastandorte.json");

  const gazData = getGazDataForTopicIds(sources, [
    "bpklimastandorte",
    "bezirke",
    "quartiere",
    "adressen",
  ]);

  setGazData(gazData);
};

function App() {
  const [gazData, setGazData] = useState([]);
  useEffect(() => {
    getGazData(setGazData);
  }, []);
  return (
    <TopicMapContextProvider
      appKey='BestPracticeKlimaschutzWuppertal.TopicMap'
      featureTooltipFunction={(feature) => feature?.text}
      featureItemsURL={host + "/data/bpklima.data.json"}
      getFeatureStyler={getGTMFeatureStyler}
      convertItemToFeature={convertBPKlimaItemsToFeature}
      clusteringOptions={{
        iconCreateFunction: getClusterIconCreatorFunction(30, (props) => props.color),
      }}
      clusteringEnabled={true}
      itemFilterFunction={itemFilterFunction}
      titleFactory={titleFactory}
      classKeyFunction={(item) => item.thema?.name}
      getColorFromProperties={(item) => item?.thema?.farbe}
      additionalLayerConfiguration={{
        fernwaerme: {
          title: (
            <span>
              Fernwärme{" "}
              <Icon
                style={{
                  color: "#EEB48C",
                  width: "30px",
                  textAlign: "center",
                }}
                name={"circle"}
              />
            </span>
          ),
          initialActive: true,
          layer: (
            <StyledWMSTileLayer
              key={"fernwaermewsw"}
              url='https://maps.wuppertal.de/deegree/wms'
              layers='fernwaermewsw '
              format='image/png'
              tiled='true'
              transparent='true'
              maxZoom={19}
              opacity={0.7}
            />
          ),
        },
      }}
    >
      <TopicMapComponent
        applicationMenuTooltipString='Filter | Einstellungen | Anleitung'
        locatorControl={true}
        modalMenu={<MyMenu />}
        gazData={gazData}
        gazetteerSearchPlaceholder='Klimaort | Stadtteil | Adresse'
        infoBox={
          <GenericInfoBoxFromFeature
            pixelwidth={400}
            config={{
              displaySecondaryInfoAction: true,
              city: "Wuppertal",
              navigator: {
                noun: {
                  singular: "Klimaort",
                  plural: "Klimaorte",
                },
              },
              noCurrentFeatureTitle: "Keine Klimaorte gefunden",
              noCurrentFeatureContent: "",
            }}
          />
        }
        secondaryInfo={<InfoPanel />}
      >
        <FeatureCollection />
      </TopicMapComponent>
    </TopicMapContextProvider>
  );
}

export default App;