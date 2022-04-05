import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { MappingConstants } from "react-cismap";
import Icon from "react-cismap/commons/Icon";
import TopicMapContextProvider from "react-cismap/contexts/TopicMapContextProvider";
import StyledWMSTileLayer from "react-cismap/StyledWMSTileLayer";
import { getClusterIconCreatorFunction } from "react-cismap/tools/uiHelper";
import "react-cismap/topicMaps.css";
import getGTMFeatureStyler from "react-cismap/topicmaps/generic/GTMStyler";
import "./App.css";
import itemFilterFunction from "./helper/filter";
import convertBPKlimaItemsToFeature from "./helper/itemConverter";
import { getMode, getModeUrl } from "./helper/modeParser";
import titleFactory from "./helper/titleFactory";
import KlimaorteMap from "./KlimaorteMap";
import createItemsDictionary from "./helper/createItemsDictionary";
import getKlimaOrtkarteStyler from "./helper/styler";

export const dataHost = "https://wupp-topicmaps-data.cismet.de";

const appKey = "Klimaortkarte.TopicMap";

function App() {
  return (
    <TopicMapContextProvider
      appKey={appKey}
      featureTooltipFunction={(feature) => feature?.text}
      featureItemsURL={dataHost + "/data/klimaortkarte.data.json"}
      featureItemsURL__={"/data/klimaortkarte.data.json"}
      createFeatureItemsDictionary={createItemsDictionary}
      referenceSystemDefinition={MappingConstants.proj4crs25832def}
      mapEPSGCode='25832'
      referenceSystem={MappingConstants.crs25832}
      getFeatureStyler={getKlimaOrtkarteStyler}
      getFeatureStyler__={getGTMFeatureStyler}
      convertItemToFeature={convertBPKlimaItemsToFeature}
      clusteringOptions={{
        iconCreateFunction: getClusterIconCreatorFunction(30, (props) => props.color),
      }}
      clusteringEnabled={true}
      itemFilterFunction={itemFilterFunction}
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
      <KlimaorteMap />
    </TopicMapContextProvider>
  );
}

export default App;
