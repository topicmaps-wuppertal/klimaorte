import { useContext } from "react";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import GenericInfoBoxFromFeature from "react-cismap/topicmaps/GenericInfoBoxFromFeature";
import InfoBoxHeader from "react-cismap/topicmaps/InfoBoxHeader";
import { appModes } from "./helper/modeParser";

const InfoBox = (props) => {
  const featureCollectionContext = useContext(FeatureCollectionContext);
  const { setSelectedFeatureByPredicate } = useContext(FeatureCollectionDispatchContext);
  const { selectedFeature, filterState, shownFeatures, filteredItems, itemsDictionary } =
    featureCollectionContext;

  const overlappingHeaders = [];
  let counter = 1;
  const isActive = () => true; // //itemFilterFunction({ filterState });

  if (props.appMode === appModes.ROUTEN && selectedFeature?.properties?.routen) {
    for (const route of selectedFeature.properties.routen) {
      if (isActive(route)) {
        overlappingHeaders.push(
          <div
            key={"overlapping." + route.name}
            style={{
              width: 380,
              paddingBottom: 3,
              paddingLeft: counter * 5,

              cursor: "pointer", //is a hand
            }}
            onClick={() => {
              setSelectedFeatureByPredicate((feature) => {
                return feature?.properties?.typ === "route" && feature?.properties?.id === route.id;
              });
            }}
          >
            <InfoBoxHeader
              headerColor={"#92BE4D"}
              content={"Klimaroute " + route.name}
            ></InfoBoxHeader>
          </div>
        );
      }
      counter++;
    }
  }

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
          getTotalNumberOfItems: (items) => {
            if (items && items.length > 0) {
              //add aussichtspunkte in routen
              let countAussichtspunkte = 0;
              items
                .filter((item) => item.typ === "route")
                .forEach((route) => {
                  const cap = route.routenpunkte.filter((rp) => rp.typ === "aussichtspunkt").length;
                  countAussichtspunkte += cap;
                });
              return items.length + countAussichtspunkte;
            }
          },

          getNumberOfShownFeatures: (featureCollection) =>
            featureCollection.filter((feature) => feature.preventSelection !== true).length,
        }}
        secondaryInfoBoxElements={[overlappingHeaders, ...(props.secondaryInfoBoxElements || [])]}
      />
    </div>
  );
};

export default InfoBox;
