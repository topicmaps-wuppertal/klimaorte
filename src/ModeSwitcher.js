import React from "react";

import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { TopicMapContext } from "react-cismap/contexts/TopicMapContextProvider";
import { ResponsiveTopicMapContext } from "react-cismap/contexts/ResponsiveTopicMapContextProvider";
import { appModes, getModeUrl } from "./helper/modeParser";

const Comp = ({ mode, setMode }) => {
  let titleContent;
  const { history } = useContext(TopicMapContext);
  const { windowSize } = useContext(ResponsiveTopicMapContext);

  if (mode === appModes.ORTE) {
    titleContent = (
      <div>
        <b>Klimaorte in Wuppertal</b>

        <div style={{ float: "right", paddingRight: 10 }}>
          <a
            className='renderAsLink'
            style={{ color: "#337ab7" }}
            onClick={() => {
              setMode(appModes.ROUTEN);
            }}
          >
            <FontAwesomeIcon icon={faRandom} style={{ marginRight: 5 }} />
            Klimarouten
          </a>
        </div>
      </div>
    );
  } else {
    titleContent = (
      <div>
        <b>Klimarouten in Wuppertal</b>
        <div style={{ float: "right", paddingRight: 10 }}>
          <a
            className='renderAsLink'
            style={{ color: "#337ab7" }}
            onClick={() => {
              setMode(appModes.ORTE);
            }}
          >
            <FontAwesomeIcon icon={faRandom} style={{ marginRight: 5 }} />
            Klimaorte
          </a>
        </div>
      </div>
    );
  }

  let title = null;
  title = (
    <table
      border='0'
      style={{
        width: (windowSize?.width || 300) - 54 - 12 - 38 - 12 + "px",
        height: "30px",
        position: "absolute",
        left: 54,
        top: 12,
        zIndex: 555,
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              background: "#ffffff",
              color: "black",
              opacity: "0.9",
              _paddingLeft: "10px",
            }}
          >
            {titleContent}
          </td>
        </tr>
      </tbody>
    </table>
  );
  return title;
};

export default Comp;
