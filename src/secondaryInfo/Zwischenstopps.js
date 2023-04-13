import React, { useContext } from "react";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import SecondaryInfoPanelSection from "react-cismap/topicmaps/SecondaryInfoPanelSection";
import SecondaryInfo from "react-cismap/topicmaps/SecondaryInfo";
import Footer from "./Footer";

const InfoPanel = () => {
  const { selectedFeature, items } = useContext(FeatureCollectionContext);

  const item = selectedFeature?.properties;

  //turn the linebreaks of item.beschreibung into <br> tags and put it into text
  const text = item.beschreibung.split("\n").map((item, key) => {
    return (
      <span key={key}>
        {item}
        <br />
      </span>
    );
  });

  return (
    <SecondaryInfo
      titleIconName="info-circle"
      title={"Zwischenstopp: " + item.name}
      mainSection={
        <div style={{ width: "100%" }}>
          <div style={{ fontSize: "115%", padding: "10px", paddingTop: "0px" }}>
            {item.beschreibung && (
              <p>
                {text}
                <br />
              </p>
            )}
          </div>
        </div>
      }
      footer={<Footer />}
    />
  );
};
export default InfoPanel;
