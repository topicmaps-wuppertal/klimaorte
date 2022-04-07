import { useContext } from "react";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import InfoBoxHeader from "react-cismap/topicmaps/InfoBoxHeader";
import { appModes } from "./helper/modeParser";
import { getColorConsideringSeondarySelection } from "./helper/styler";

const InfoBox = (props) => {
  const featureCollectionContext = useContext(FeatureCollectionContext);
  const {
    setSelectedFeatureByPredicate,
    setNextSelectedFeatureByPredicate,
    setPrevSelectedFeatureByPredicate,
  } = useContext(FeatureCollectionDispatchContext);
  const {
    filterState,
    shownFeatures,
    filteredItems,
    itemsDictionary,
    selectedFeature,
    secondarySelection,
  } = featureCollectionContext;

  const overlappingHeaders = [];
  let counter = 1;
  const isActive = () => true; // //itemFilterFunction({ filterState });

  if (props.appMode === appModes.ROUTEN) {
    if (selectedFeature?.properties?.routen) {
      for (const route of selectedFeature.properties.routen) {
        if (isActive(route)) {
          overlappingHeaders.push(
            <div
              key={"overlapping." + route.name}
              style={{
                width: 390,
                paddingBottom: 3,
                paddingLeft: (selectedFeature.properties.routen.length - counter) * 10,
                cursor: "pointer", //is a hand
              }}
              onClick={() => {
                setSelectedFeatureByPredicate((feature) => {
                  return (
                    feature?.properties?.typ === "route" && feature?.properties?.id === route.id
                  );
                });
              }}
            >
              <InfoBoxHeader
                headerColor={getColorConsideringSeondarySelection(route, secondarySelection)}
                content={"Klimaroute " + route.name}
              ></InfoBoxHeader>
            </div>
          );
        }
        counter++;
      }
    }
    let config;

    if (selectedFeature?.properties?.typ === "route") {
      //if a route is the selected element
      config = {
        displaySecondaryInfoAction: props.moreDataAvailable,
        city: "Wuppertal",
        navigator: {
          noun: {
            singular: "Klimaroute",
            plural: "Klimarouten",
          },
        },
        noCurrentFeatureTitle: "Keine Klimarouten gefunden",
        noCurrentFeatureContent: "",
        getTotalNumberOfItems: () => {
          return Object.values(itemsDictionary.routen).length;
        },
        getNumberOfShownFeatures: (featureCollection) =>
          featureCollection.filter(
            (feature) => feature.preventSelection !== true && feature.properties.typ === "route"
          ).length,
        next: () => {
          console.log("click next ");

          setNextSelectedFeatureByPredicate((feature) => {
            console.log("predicate check for feature", feature);

            return feature?.properties?.typ === "route";
          });
        },
        previous: () => {
          setPrevSelectedFeatureByPredicate((feature) => {
            return feature?.properties?.typ === "route";
          });
        },
      };
    } else {
      //if a ort or aussichtspunkt is the selected element
      config = {
        displaySecondaryInfoAction: props.moreDataAvailable,
        city: "Wuppertal",
        navigator: {
          noun: {
            singular: "Klimaort auf dieser Route",
            plural: "Klimaorte auf dieser Route",
          },
        },
        noCurrentFeatureTitle: "Keine Klimaorte gefunden",
        noCurrentFeatureContent: "",

        getTotalNumberOfItems: (items) => {
          if (secondarySelection) {
            return (
              itemsDictionary.angeboteInRouten[secondarySelection.id].length +
              itemsDictionary.standorteInRouten[secondarySelection.id].filter(
                (s) => s.typ === "aussichtspunkt"
              ).length
            );
          } else {
            return "";
          }
        },

        getNumberOfShownFeatures: (featureCollection) => {
          if (featureCollection) {
            const featuresThatCount = featureCollection.filter(
              (feature) =>
                feature.preventSelection !== true &&
                feature.properties.routen &&
                feature.properties.routen.filter((r) => r.id === secondarySelection.id).length > 0
            );

            return featuresThatCount.length;
          } else {
            return "";
          }
        },
      };
    }

    return (
      <div>
        <GenericInfoBoxFromFeature
          {...props}
          config={config}
          secondaryInfoBoxElements={[overlappingHeaders, ...(props.secondaryInfoBoxElements || [])]}
        />
      </div>
    );
  } else {
    return (
      <div>
        <GenericInfoBoxFromFeature
          {...props}
          config={{
            displaySecondaryInfoAction: props.moreDataAvailable,
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
      </div>
    );
  }
};

export default InfoBox;
