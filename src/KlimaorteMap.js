import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import FeatureCollection from "react-cismap/FeatureCollection";
import { md5FetchText } from "react-cismap/tools/fetching";
import { getGazDataForTopicIds } from "react-cismap/tools/gazetteerHelper";
import "react-cismap/topicMaps.css";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import InfoBoxFotoPreview from "react-cismap/topicmaps/InfoBoxFotoPreview";
import ModeSwitcher from "./ModeSwitcher";

import TopicMapComponent from "react-cismap/topicmaps/TopicMapComponent";
import "./App.css";
import MyMenu, { getFilterInfo } from "./Menu";
import InfoPanel from "./SecondaryInfo";
import { dataHost } from "./App";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import {
  TopicMapContext,
  TopicMapDispatchContext,
} from "react-cismap/contexts/TopicMapContextProvider";
import { removeQueryPart } from "react-cismap/tools/routingHelper";
import { LightBoxDispatchContext } from "react-cismap/contexts/LightBoxContextProvider";
import { appModes, getMode, getModeUrl } from "./helper/modeParser";
import { getClusterIconCreatorFunction } from "react-cismap/tools/uiHelper";
import { getColorConsideringSeondarySelection } from "./helper/styler";
import InfoBox from "./InfoBox";
const getGazData = async (setGazData) => {
  const prefix = "GazDataForStories";
  const sources = {};

  sources.adressen = await md5FetchText(
    prefix,
    dataHost + "/data/adressen.json"
  );
  sources.bezirke = await md5FetchText(prefix, dataHost + "/data/bezirke.json");
  sources.quartiere = await md5FetchText(
    prefix,
    dataHost + "/data/quartiere.json"
  );
  sources.bpklimastandorte = await md5FetchText(
    prefix,
    dataHost + "/data/bpklimastandorte.json"
  );

  const gazData = getGazDataForTopicIds(sources, [
    "bpklimastandorte",
    "bezirke",
    "quartiere",
    "adressen",
  ]);

  setGazData(gazData);
};

function KlimaorteMap() {
  const { setSelectedFeatureByPredicate, setFilterState, setFilterMode } =
    useContext(FeatureCollectionDispatchContext);
  const lightBoxDispatchContext = useContext(LightBoxDispatchContext);
  const {
    selectedFeature,
    items,
    shownFeatures,
    filterState,
    filterMode,
    filteredItems,
    secondarySelection,
  } = useContext(FeatureCollectionContext);
  const { zoomToFeature, setAppMode } = useContext(TopicMapDispatchContext);
  const { history, appMode } = useContext(TopicMapContext);

  useEffect(() => {
    if (appMode === undefined) {
      setAppMode(getMode());
    }
  }, [appMode, setAppMode]);
  const [gazData, setGazData] = useState([]);
  useEffect(() => {
    getGazData(setGazData);
  }, []);

  useEffect(() => {
    const handleShow = (search) => {
      //check whether shownFeatures is undefined
      //then the map is not ready wait for it
      if (shownFeatures === undefined || items === undefined) {
        return;
      }
      const show = new URLSearchParams(search).get("show");
      const foundShow = show != null;
      if (foundShow === true) {
        //check whether the feature is already shown
        const foundFeature = shownFeatures.find(
          (f) => f.properties.standort.id === parseInt(show)
        );
        if (foundFeature !== undefined) {
          setSelectedFeatureByPredicate((feature) => {
            try {
              return (
                parseInt(feature.properties.standort.id) === parseInt(show)
              );
            } catch (e) {
              return false;
            }
          });
          history.push(removeQueryPart(search, "show"));
        } else {
          //check whether the feature is in the items list
          const foundFeature = items.find(
            (i) => i.standort.id === parseInt(show)
          );

          if (foundFeature !== undefined) {
            const { themen } = getFilterInfo(items);
            setFilterState({ ...filterState, themen });
            // reset the filter
          } else {
            console.log("Objekt mit Standort.ID=" + show + " nicht gefunden");
            history.push(removeQueryPart(search, "show"));
          }
        }

        // setFilterState({ kampagnen: [] });
        // setAppMenuVisible(true);
        // setTimeout(() => {
        //   setAppMenuActiveMenuSection("filter");
        // }, 50);
      }
    };

    handleShow(history.location.search);
    return history.listen(() => {
      handleShow(history.location.search);
    });
  }, [history, shownFeatures, items]);

  let weitereAngebote;
  const item = selectedFeature?.properties;
  let moreDataAvailable = false;
  //case switch for  selectedFeature.featuretype
  switch (selectedFeature?.featuretype) {
    case "route":
      moreDataAvailable = true;
      break;
    case "zwischenstopp":
      moreDataAvailable = true;
      break;
    case "ort":
      const angebot = item;
      if (angebot) {
        weitereAngebote = items.filter(
          (testItem) =>
            testItem.typ === "ort" &&
            testItem?.standort.id === angebot?.standort?.id &&
            testItem.id !== angebot.id
        );
        moreDataAvailable =
          weitereAngebote.length > 0 ||
          selectedFeature?.properties?.bemerkung !== undefined ||
          selectedFeature?.properties?.kommentar !== undefined;
      }
      break;
    case "aussichtspunkt":
      break;
    case "poi":
      break;
    default:
      break;
  }

  const linkProduction = new URLSearchParams(history.location.search).get(
    "linkProduction"
  );
  const linkProductionEnabled = linkProduction != null;

  let secondaryInfoBoxElements = [
    <InfoBoxFotoPreview
      lightBoxDispatchContext={lightBoxDispatchContext}
      currentFeature={selectedFeature}
    />,
  ];

  if (linkProductionEnabled) {
    secondaryInfoBoxElements.push(
      <a
        href={
          window.location.href +
          "&show=" +
          selectedFeature?.properties?.standort?.id
        }
        target="_blank"
        rel="noreferrer"
      >
        π
      </a>
    );
  }
  // console.log("appMOde", appMode);

  let iconCreateFunction;

  if (appMode === appModes.ROUTEN) {
    iconCreateFunction = getClusterIconCreatorFunction(30, (props) => {
      return getColorConsideringSeondarySelection(props, secondarySelection);
    });
  } else {
    iconCreateFunction = getClusterIconCreatorFunction(
      30,
      (props) => props.color
    );
  }

  return (
    <div>
      <ModeSwitcher
        mode={appMode}
        setMode={(mode) => {
          window.location.href = getModeUrl(mode);
          // setModeState(mode);
          setAppMode(mode);
        }}
      />
      <TopicMapComponent
        maxZoom={19}
        minZoom={8}
        applicationMenuTooltipString="Filter | Einstellungen | Anleitung"
        locatorControl={true}
        modalMenu={<MyMenu mode={appMode} />}
        gazData={gazData}
        gazetteerSearchPlaceholder="Klimaort | Stadtteil | Adresse"
        infoBox={
          <InfoBox
            key={JSON.stringify(selectedFeature)}
            appMode={appMode}
            pixelwidth={400}
            secondaryInfoBoxElements={secondaryInfoBoxElements}
            moreDataAvailable={moreDataAvailable}
            selectedFeature={selectedFeature}
            secondarySelection={secondarySelection}
          />
        }
        secondaryInfo={<InfoPanel />}
        gazetteerHitTrigger={(hits) => {
          if (Array.isArray(hits) && hits[0]?.more?.id) {
            setSelectedFeatureByPredicate((feature) => {
              try {
                const check =
                  parseInt(feature.properties.standort.id) === hits[0].more.id;
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
        <FeatureCollection
          key={"featureCollection" + appMode}
          clusteringOptions={{
            iconCreateFunction,
          }}
        />
      </TopicMapComponent>
    </div>
  );
}

export default KlimaorteMap;
