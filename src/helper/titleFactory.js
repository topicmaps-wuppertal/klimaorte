import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { appModes, getMode, getModeUrl } from "./modeParser";

const factory = ({ featureCollectionContext, responsiveTopicMapContext }) => {
  const additionalControls = undefined;
  const additionalControlsShown = false;
  const mode = getMode();
  console.log("mode", mode);

  // const { history } = useContext(TopicMapContext);
  const { windowSize } = responsiveTopicMapContext;
  const getThemaById = (id) => {
    const result = featureCollectionContext?.items?.find((item) => item?.thema?.id === id);
    return result?.thema?.name;
  };

  let desc = "?";
  if (featureCollectionContext?.filteredItems?.length === featureCollectionContext?.items?.length) {
    desc = undefined;
  } else if (featureCollectionContext?.filterMode === "themen") {
    if (featureCollectionContext?.filterState?.themen?.length <= 2) {
      const themenIds = featureCollectionContext?.filterState?.themen;
      const themen = [];
      for (const id of themenIds) {
        themen.push(getThemaById(id));
      }

      desc = "nach Themen gefiltert (nur " + themen.join(", ") + ")";
    } else {
      desc =
        "nach Themen gefiltert (" +
        featureCollectionContext?.filterState?.themen?.length +
        " Themen)";
    }
  } else if (featureCollectionContext?.filterMode === "kategorien") {
    if (featureCollectionContext?.filterState?.kategorien?.length <= 3) {
      desc =
        "nach Kategorien gefiltert (nur " +
        featureCollectionContext?.filterState?.kategorien?.join(", ") +
        ")";
    } else {
      desc =
        "nach Kategorien gefiltert (" +
        featureCollectionContext?.filterState?.kategorien?.length +
        " Kategorien)";
    }
  }

  if (featureCollectionContext?.filteredItems?.length === 0) {
    return (
      <div>
        <b>Keine Klimaorte gefunden!</b> Bitte überprüfen Sie Ihre Filtereinstellungen.
      </div>
    );
  }

  if (desc) {
    return (
      <div key={"title" + mode}>
        <b>Klimaortkarte:</b> {desc}{" "}
        <div style={{ float: "right", paddingRight: 10 }}>
          <a
            className='renderAsLink'
            style={{ color: "#337ab7" }}
            href={mode === appModes.ORTE ? getModeUrl(appModes.ROUTEN) : getModeUrl(appModes.ORTE)}
          >
            <FontAwesomeIcon icon={faRandom} style={{ marginRight: 5 }} />
            {mode === appModes.ORTE ? "Klimarouten" : "Klimaorte"} anzeigen
          </a>
        </div>
      </div>
    );
  } else {
    return undefined;
  }
};

export default factory;
