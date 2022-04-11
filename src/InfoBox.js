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
    const select = (direction, order, getType, getId = (obj) => obj) => {
      const orderNum = [];
      for (const obj of order) {
        orderNum.push({ typ: getType(obj), id: getId(obj) });
      }
      const currentTarget = {
        typ: selectedFeature?.properties?.typ,
        id: selectedFeature?.properties?.id,
      };
      let counter = 0;
      const doubleOrder = [...orderNum, ...orderNum];
      let nextId;
      if (direction === NEXT) {
        const orderIndexOfSelectedFeature = doubleOrder.findIndex(
          (tester) => currentTarget.typ === tester.typ && currentTarget.id === tester.id
        );
        nextId = orderIndexOfSelectedFeature + 1;
      } else {
        const orderIndexOfSelectedFeature =
          doubleOrder.findIndex(
            (tester) => currentTarget.typ === tester.typ && currentTarget.id === tester.id
          ) + order.length;
        nextId = orderIndexOfSelectedFeature - 1;
      }
      let index = 0;
      while (counter < shownFeatures.length) {
        if (
          shownFeatures[index].properties.typ === doubleOrder[nextId].typ &&
          shownFeatures[index].properties.id === doubleOrder[nextId].id
        ) {
          setSelectedFeatureByPredicate((feature) => {
            return (
              feature?.properties?.typ === doubleOrder[nextId].typ &&
              feature?.properties?.id === doubleOrder[nextId].id
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
          select(NEXT, Object.keys(itemsDictionary.routen), () => "route");
        },
        previous: () => {
          select(PREV, Object.keys(itemsDictionary.routen), () => "route");
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
            return itemsDictionary.angeboteAndAussichtspunkteInRouten[secondarySelection.id].length;
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
          select(
            NEXT,
            itemsDictionary.angeboteAndAussichtspunkteInRouten[secondarySelection.id],
            (obj) => (obj.typ === "angebot" ? "ort" : "aussichtspunkt"),
            (obj) => obj.id
          );
        },
        previous: () => {
          select(
            PREV,
            itemsDictionary.angeboteAndAussichtspunkteInRouten[secondarySelection.id],
            (obj) => (obj.typ === "angebot" ? "ort" : "aussichtspunkt"),
            (obj) => obj.id
          );
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
