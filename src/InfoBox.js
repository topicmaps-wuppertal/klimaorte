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

    const NEXT = 1;
    const PREV = -1;
    const select = (direction, order, typ) => {
      const orderNum = [];
      for (const id of order) {
        orderNum.push(parseInt(id));
      }
      const currentId = selectedFeature?.properties?.id;
      let counter = 0;
      const doubleOrder = [...orderNum, ...orderNum];
      let nextId;
      if (direction === NEXT) {
        const orderIndexOfSelectedFeature = doubleOrder.indexOf(currentId);
        nextId = orderIndexOfSelectedFeature + 1;
      } else {
        const orderIndexOfSelectedFeature = doubleOrder.indexOf(currentId) + order.length;
        nextId = orderIndexOfSelectedFeature - 1;
      }
      let index = 0;
      while (counter < shownFeatures.length) {
        if (
          shownFeatures[index].properties.typ === typ &&
          shownFeatures[index].properties.id === doubleOrder[nextId]
        ) {
          setSelectedFeatureByPredicate((feature) => {
            return (
              feature?.properties?.typ === typ && feature?.properties?.id === doubleOrder[nextId]
            );
          });
          break;
        }
        index++;
        if (index >= shownFeatures.length) {
          index = 0;
        }
        counter++;
      }
    };

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
          select(NEXT, Object.keys(itemsDictionary.routen), "route");
        },
        previous: () => {
          select(PREV, Object.keys(itemsDictionary.routen), "route");
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
          if (secondarySelection?.id) {
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
          if (featureCollection && secondarySelection?.id) {
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
        next: () => {
          select(NEXT, itemsDictionary.angeboteInRouten[secondarySelection.id], "ort");
        },
        previous: () => {
          select(PREV, itemsDictionary.angeboteInRouten[secondarySelection.id], "ort");
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
