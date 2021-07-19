import { useContext } from "react";
import {
  FeatureCollectionContext,
  FeatureCollectionDispatchContext,
} from "react-cismap/contexts/FeatureCollectionContextProvider";
import { UIDispatchContext } from "react-cismap/contexts/UIContextProvider";
import { getSimpleHelpForTM } from "react-cismap/tools/uiHelper";
import { Link } from "react-scroll";
import ModalApplicationMenu from "react-cismap/topicmaps/menu/ModalApplicationMenu";
import Section from "react-cismap/topicmaps/menu/Section";
import FilterPanel from "react-cismap/topicmaps/menu/FilterPanel";
import DefaultSettingsPanel from "react-cismap/topicmaps/menu/DefaultSettingsPanel";
import ConfigurableDocBlocks from "react-cismap/topicmaps/ConfigurableDocBlocks";
import MenuFooter from "./MenuFooter";
import CustomizationContextProvider from "react-cismap/contexts/CustomizationContextProvider";

import Icon from "react-cismap/commons/Icon";
import { addSVGToProps } from "react-cismap/tools/svgHelper";

const MyMenu = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);
  const { filterState, filterMode, filteredItems, shownFeatures } =
    useContext(FeatureCollectionContext);
  const { setFilterState, setFilterMode } = useContext(FeatureCollectionDispatchContext);

  const { items } = useContext(FeatureCollectionContext);

  let kategorien = [];
  const katValues = [];
  let themen = [];
  const themenValues = [];

  for (const item of items || []) {
    for (const kat of item.kategorien) {
      if (!kategorien.includes(kat)) {
        katValues.push({ key: kat });
        kategorien.push(kat);
      }
    }
    if (!themen.includes(item.thema.id)) {
      themen.push(item.thema.id);
      themenValues.push({ key: item.thema.id, title: item.thema.name, color: item.thema.farbe });
    }
  }

  themenValues.sort((a, b) => a.title.localeCompare(b.title));
  katValues.sort((a, b) => a.key.localeCompare(b.key));

  themen = [];

  for (const t of themenValues) {
    themen.push(t.key);
  }
  kategorien = [];

  for (const k of katValues) {
    kategorien.push(k.key);
  }

  const filterConfiguration = {
    mode: "tabs", // list or tabs
    filters: [
      {
        title: "Themen",
        key: "themen",
        icon: "folder",
        type: "tags", //"checkBoxes",
        values: themenValues,
        setAll: () => {
          setFilterState({ ...filterState, themen });
        },
        setNone: () => {
          setFilterState({ ...filterState, themen: [] });
        },
        colorizer: (item, selected) => (selected ? item.color : "#eeeeee"),
      },
      {
        title: "Kategorien",
        key: "kategorien",
        icon: "tags",
        type: "tags",
        values: katValues,
        setAll: () => {
          setFilterState({ ...filterState, kategorien });
        },
        setNone: () => {
          setFilterState({ ...filterState, kategorien: [] });
        },
      },
    ],
  };

  if ((filterState === undefined) & (items !== undefined)) {
    setFilterState({ kategorien, themen });
  }
  if ((filterMode === undefined) & (items !== undefined)) {
    setFilterMode("themen");
  }
  const topicMapTitle = "Klimaortkarte Wuppertal";
  const simpleHelp = undefined;

  const getFilterHeader = () => {
    const count = filteredItems?.length || 0;

    let term;
    if (count === 1) {
      term = "Standort";
    } else {
      term = "Standorte";
    }

    return `Meine Klimaorte (${count} ${term} gefunden, davon ${
      shownFeatures?.length || "0"
    } in der Karte)`;
  };

  return (
    <CustomizationContextProvider
      customizations={{
        inKartePositionieren: {
          listWithSymbols: (
            <p>
              Durch das in der Auswahlliste vorangestellte Symbol erkennen Sie, ob es sich bei einem
              Treffer um einen{" "}
              <NW>
                <Icon name='circle' /> Stadtbezirk
              </NW>
              , ein{" "}
              <NW>
                <Icon name='pie-chart' /> Quartier
              </NW>
              , eine{" "}
              <NW>
                <Icon name='home' /> Adresse
              </NW>
              , eine{" "}
              <NW>
                <Icon name='road' /> Straße ohne Hausnummern
              </NW>
              , eine{" "}
              <NW>
                <Icon name='child' /> Kindertageseinrichtung
              </NW>
              , eine{" "}
              <NW>
                <Icon name='graduation-cap' /> Schule
              </NW>{" "}
              oder einen{" "}
              <NW>
                <Icon name='sun' /> Klimaort
              </NW>{" "}
              handelt.
            </p>
          ),
        },
        fachobjekteAuswaehlen: {
          furtherExplanationOfClickableContent: " (Signaturen oder dunkelblaue Fahrradtrassen)",
        },
        hintergrund: {
          additionalDatasources: (
            <p>
              <ul>
                <li>
                  <strong>Fernwärme</strong>: Kartendienst (WMS) der Stadt Wuppertal in
                  Zusammenarbeit mit der{" "}
                  <a
                    target='_wsw'
                    href='https://www.wsw-online.de/wsw-energie-wasser/privatkunden/produkte/fernwaerme/talwaerme-wuppertal/'
                  >
                    WSW GmbH
                  </a>
                  . Datengrundlage: Fernwärmeleitungen der Wuppertaler Stadtwerke GmbH (Stand
                  02.2021) mit einer Puffergröße von 10 m. ©{" "}
                  <a target='_wsw' href='https://www.wsw-online.de/impressum/'>
                    Wuppertaler Stadtwerke GmbH
                  </a>
                  .
                </li>
              </ul>
            </p>
          ),
        },
      }}
    >
      <ModalApplicationMenu
        menuIcon={"bars"}
        menuTitle={"Meine Klimaorte, Einstellungen und Kompaktanleitung"}
        menuFooter={<MenuFooter />}
        menuIntroduction={
          <span>
            Benutzen Sie die Auswahlmöglichkeiten unter{" "}
            <Link
              className='useAClassNameToRenderProperLink'
              to='filter'
              containerId='myMenu'
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("filter")}
            >
              Meine Klimaorte
            </Link>
            , um die in der Karte angezeigten vorbildlichen Klimaorte auf die für Sie relevanten
            Themen zu beschränken. Über{" "}
            <Link
              className='useAClassNameToRenderProperLink'
              to='settings'
              containerId='myMenu'
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("settings")}
            >
              Einstellungen
            </Link>{" "}
            können Sie die Darstellung der Hintergrundkarte und der klimarelevanten Themen an Ihre
            Interesse anpassen. Wählen Sie die{" "}
            <Link
              className='useAClassNameToRenderProperLink'
              to='help'
              containerId='myMenu'
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("help")}
            >
              Kompaktanleitung
            </Link>{" "}
            für detailliertere Bedienungsinformationen.
          </span>
        }
        menuSections={[
          <Section
            key='filter'
            sectionKey='filter'
            sectionTitle={getFilterHeader()}
            sectionBsStyle='primary'
            sectionContent={<FilterPanel filterConfiguration={filterConfiguration} />}
          />,
          <DefaultSettingsPanel key='settings' />,
          <Section
            key='help'
            sectionKey='help'
            sectionTitle='Kompaktanleitung'
            sectionBsStyle='default'
            sectionContent={
              <ConfigurableDocBlocks configs={getSimpleHelpForTM(topicMapTitle, simpleHelp)} />
            }
          />,
        ]}
      />
    </CustomizationContextProvider>
  );
};
export default MyMenu;
const NW = (props) => {
  return <span style={{ whiteSpace: "nowrap" }}>{props.children}</span>;
};
