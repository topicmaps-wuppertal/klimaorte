import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import FeatureCollection from "react-cismap/FeatureCollection";
import { md5FetchText } from "react-cismap/tools/fetching";
import { getGazDataForTopicIds } from "react-cismap/tools/gazetteerHelper";
import "react-cismap/topicMaps.css";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import "./App.css";
import MyMenu from "./Menu";
import InfoPanel from "./SecondaryInfo";

import { dataHost } from "./App";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { TopicMapDispatchContext } from "react-cismap/contexts/TopicMapContextProvider";
const getGazData = async (setGazData) => {
  const prefix = "GazDataForStories";
  const sources = {};

  sources.adressen = await md5FetchText(prefix, dataHost + "/data/adressen.json");
  sources.bezirke = await md5FetchText(prefix, dataHost + "/data/bezirke.json");
  sources.quartiere = await md5FetchText(prefix, dataHost + "/data/quartiere.json");
  sources.bpklimastandorte = await md5FetchText(prefix, dataHost + "/data/bpklimastandorte.json");

  const gazData = getGazDataForTopicIds(sources, [
    "bpklimastandorte",
    "bezirke",
    "quartiere",
    "adressen",
  ]);

  setGazData(gazData);
};

function KlimaorteMap() {
  const { setSelectedFeatureByPredicate, setFilterState } = useContext(
    FeatureCollectionDispatchContext
  );
  const { selectedFeature, items } = useContext(FeatureCollectionContext);
  const { zoomToFeature } = useContext(TopicMapDispatchContext);

  const [gazData, setGazData] = useState([]);
  useEffect(() => {
    getGazData(setGazData);
  }, []);
  //   console.log("selectedFeature", selectedFeature);

  let weitereAngebote;
  const angebot = selectedFeature?.properties;
  let moreDataAvailable = false;
  if (angebot) {
    weitereAngebote = items.filter(
      (testItem) => testItem?.standort.id === angebot.standort.id && testItem.id !== angebot.id
    );
    moreDataAvailable =
      weitereAngebote.length > 0 ||
      selectedFeature?.properties?.bemerkung !== undefined ||
      selectedFeature?.properties?.kommentar !== undefined;
  }

  return (
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
            displaySecondaryInfoAction: moreDataAvailable,
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
      gazetteerHitTrigger={(hits) => {
        if (Array.isArray(hits) && hits[0]?.more?.id) {
          setSelectedFeatureByPredicate((feature) => {
            try {
              const check = parseInt(feature.properties.standort.id) === hits[0].more.id;
              if (check === true) {
                zoomToFeature(feature);
              }
              return check;
            } catch (e) {
              return false;
            }
          });
        }
      }}
    >
      <FeatureCollection />
    </TopicMapComponent>
  );
}

export default KlimaorteMap;
