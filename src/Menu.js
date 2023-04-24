import { useContext, useEffect, useState } from "react";
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
import previewFeatureCollection from "./helper/previewFC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import { getSymbolSVGGetter } from "react-cismap/tools/uiHelper";
import { featureSamples4Icons } from "./helper/iconFactory";
export const getFilterInfo = (items) => {
  let kategorien = [];
  const katValues = [];
  let themen = [];
  const themenValues = [];

  for (const item of items || []) {
    if (item.typ === "ort") {
      for (const kat of item.kategorien) {
        if (!kategorien.includes(kat)) {
          katValues.push({ key: kat });
          kategorien.push(kat);
        }
      }
      if (!themen.includes(item.thema.id)) {
        themen.push(item.thema.id);
        themenValues.push({
          key: item.thema.id,
          title: item.thema.name,
          color: item.thema.farbe,
        });
      }
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
  return { kategorien, katValues, themen, themenValues };
};

const MyMenu = () => {
  const { setAppMenuActiveMenuSection } = useContext(UIDispatchContext);
  const { filterState, filterMode, filteredItems, shownFeatures, allFeatures } =
    useContext(FeatureCollectionContext);
  const { setFilterState, setFilterMode } = useContext(
    FeatureCollectionDispatchContext
  );

  //use this code to get values for the featureSamples4Icons const
  // const [samples, setSamples] = useState({});
  // useEffect(() => {
  //   if (allFeatures !== undefined) {
  //     // find a Aussichtspunktfature and a Zwischenstoppfeature and st them as samples
  //     const sampleAussichtspunkt = allFeatures.find(
  //       (feature) => feature.featuretype === "aussichtspunkt"
  //     );
  //     const sampleZwischenstopp = allFeatures.find(
  //       (feature) => feature.featuretype === "zwischenstopp"
  //     );

  //     const samples = {
  //       zwischenstopp: sampleZwischenstopp,
  //       aussichtspunkt: sampleAussichtspunkt,
  //     };
  //     console.log("yyy samples", samples);

  //     setSamples(samples);
  //   }
  // }, [allFeatures]);

  const { items } = useContext(FeatureCollectionContext);

  const { kategorien, katValues, themen, themenValues } = getFilterInfo(items);

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
  const topicMapTitle = "Hintergrund";
  const simpleHelp = {
    type: "REACTCOMP",
    content: (
      <div>
        <p>
          Die Möglichkeiten zum Klima- und Umweltschutz werden aktuell global
          diskutiert, wobei bereits auf kommunaler Ebene viele Akteure und
          Einrichtungen an deren Umsetzung beteiligt sind. An den im Kartenbild
          gezeigten "Klimaorten" wird das Thema Klimaschutz praktiziert und
          vermittelt; hier wird der Klimaschutz für die Bürger:innen erlebbar.
          Viele dieser Klimaorte sind im Rahmen von innovativen Projekten durch
          den Wissenstransfer und das Engagement von Unternehmen, Vereinen,
          Verbänden sowie Quartiersbewohner:innen entstanden, die sich aktiv für
          Lösungen zum Klima- und Umweltschutz in ihrem Quartier und für die
          Stadt Wuppertal einsetzen. Zu den zielführenden Projekten gehören z.B.
          Wuppertals Klimasiedlungen, Anlagen zur effizienten und/oder
          regenerativen Energieerzeugung, Projekte der Verkehrswende sowie der
          Klima- und Umweltbildung, an denen zahlreiche Akteure mitwirken und
          mitgestalten.
        </p>
        <p>
          Mit den Klimarouten steht den Bürger:innen eine weitere Möglichkeit
          zur Erkundung der Klimaorte im Wuppertaler Stadtgebiet zur Verfügung.
          Verschiedene Routen (zu Fuß oder mit dem Fahrrad) führen Sie an
          ausgewählten Klimaorten vorbei: Aussichtspunkte{" "}
          {getSymbolSVGGetter(
            featureSamples4Icons.aussichtspunkt?.properties?.svgBadge,
            featureSamples4Icons.aussichtspunkt?.properties?.svgBadgeDimension
          )(
            20,
            featureSamples4Icons.aussichtspunkt?.properties.color,
            "aussichtspunktsample_"
          )}{" "}
          ermöglichen Ihnen den Blick auf weitere Klimaorte aus größerer
          Entfernung zu werfen und Zwischenstopps{" "}
          {getSymbolSVGGetter(
            featureSamples4Icons.zwischenstopp?.properties?.svgBadge,
            featureSamples4Icons.zwischenstopp?.properties?.svgBadgeDimension
          )(
            20,
            featureSamples4Icons.zwischenstopp?.properties.color,
            "zwischenstoppsample_"
          )}{" "}
          bieten Ihnen ausgewählte Highlights im Routenverlauf an.
        </p>
        <p>
          Ergänzt wird dieses Angebot durch weitere interessante Orte (Point of
          Interest, POI) entlang des Routenverlaufs. Begeben Sie sich auf
          Erkundungstour: die Welt des Klimaschutzes und nachhaltiger Ideen
          erwarten Sie.
        </p>
      </div>
    ),
  };

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
  const configurableDocBlocks = getSimpleHelpForTM(topicMapTitle, simpleHelp);

  configurableDocBlocks[0].configs.splice(6, 0, {
    title: "Filtern",
    bsStyle: "warning",
    contentBlockConf: {
      type: "REACTCOMP",
      content: (
        <div>
          <p>
            Im Bereich &quot;<strong>Meine Klimaorte</strong>&quot; können Sie
            im Anwendungsmenü <Icon name="bars" /> die in der Karte angezeigten
            Klimaorte so ausdünnen, dass nur die für Sie interessanten Orte
            übrig bleiben. Dabei umfasst die Filterung die Angebote an den
            Klimastandorten, wobei sich ein Angebot aus einem Thema und einer
            Kategorie ergibt. Standardmäßig sind die Einstellungen hier so
            gesetzt, dass alle verfügbaren Klimaorte angezeigt werden.
          </p>
          <p>
            Ihnen stehen somit zwei Filterkriterien zur Verfügung: "Themen" und
            "Kategorien". Innerhalb dieser Kriterien können sie in einer
            alphabetisch sortieren Menge an Schlagworten (Tags) bestimmte
            Begriffe per Mausklick selektieren bzw. deselektieren; die Auswahl
            aller bzw. keines der Schlagworte erfolgt über die Schaltfläche{" "}
            <a className="renderAsLink">alle</a> bzw.{" "}
            <a className="renderAsLink">keine</a>.
          </p>
          <p>
            Ihre Einstellungen werden direkt in der blauen Titelzeile des
            Bereichs "<strong>Meine Klimaorte</strong>" und in dem
            Donut-Diagramm, das Sie rechts neben oder unter den Filteroptionen
            finden, ausgewertet. Die Titelzeile zeigt die Gesamtanzahl der
            Klimaorte, die den von Ihnen gesetzten Filterbedingungen
            entsprechen. Das Donut-Diagramm zeigt zusätzlich die Verteilung der
            Klimaorte entsprechend der Filterkriterien "Themen" oder
            "Kategorien". Bewegen Sie dazu den Mauszeiger auf eines der farbigen
            Segmente des Diagramms. Die Farben des Donut-Diagramms entsprechen
            den farbigen Hintergründen der Schlagworte aus dem Filterkriterium
            "Themen".
          </p>
        </div>
      ),
    },
  });

  return (
    <CustomizationContextProvider
      customizations={{
        inKartePositionieren: {
          listWithSymbols: (
            <p>
              Durch das in der Auswahlliste vorangestellte Symbol erkennen Sie,
              ob es sich bei einem Treffer um einen{" "}
              <NW>
                <Icon name="circle" /> Stadtbezirk
              </NW>
              , ein{" "}
              <NW>
                <Icon name="pie-chart" /> Quartier
              </NW>
              , eine{" "}
              <NW>
                <Icon name="home" /> Adresse
              </NW>
              , eine{" "}
              <NW>
                <Icon name="road" /> Straße ohne Hausnummern
              </NW>
              , eine{" "}
              <NW>
                <Icon name="child" /> Kindertageseinrichtung
              </NW>
              , eine{" "}
              <NW>
                <Icon name="graduation-cap" /> Schule
              </NW>{" "}
              oder einen{" "}
              <NW>
                <Icon name="sun" /> Klimaort
              </NW>{" "}
              handelt.
            </p>
          ),
        },
        fachobjekteAuswaehlen: {
          furtherExplanationOfClickableContent:
            " (Signaturen oder dunkelblaue Fahrradtrassen)",
        },
        hintergrund: {
          additionalDatasources: (
            <div>
              <ul>
                <li>
                  <strong>Fernwärme</strong>: Kartendienst (WMS) der Stadt
                  Wuppertal in Zusammenarbeit mit der{" "}
                  <a
                    target="_wsw"
                    href="https://www.wsw-online.de/wsw-energie-wasser/privatkunden/produkte/fernwaerme/talwaerme-wuppertal/"
                  >
                    WSW GmbH
                  </a>
                  . Datengrundlage: Fernwärmeleitungen der Wuppertaler
                  Stadtwerke GmbH (Stand 02.2021) mit einer Puffergröße von 10
                  m. ©{" "}
                  <a target="_wsw" href="https://www.wsw-online.de/impressum/">
                    Wuppertaler Stadtwerke GmbH
                  </a>
                  .
                </li>
              </ul>

              <div>
                Im Bereich der{" "}
                <a className="styleaslink">
                  <FontAwesomeIcon icon={faRandom} /> Klimaorte
                </a>{" "}
                stellt die Klimaortkarte Wuppertal zusätzlich die Daten der{" "}
                <a
                  href="https://offenedaten-wuppertal.de/dataset/klimaorte-wuppertal"
                  target="_opendata"
                >
                  Klimaorte
                </a>{" "}
                und eine Auswahl der{" "}
                <a
                  href="https://offenedaten-wuppertal.de/dataset/radrouten-wuppertal"
                  target="_opendata"
                >
                  Radrouten
                </a>{" "}
                (mit <span style={{ whiteSpace: "nowrap" }}>1,5 Meter</span>{" "}
                Puffer) aus dem Open-Data-Angebot der Stadt Wuppertal dar. Im
                Bereich der{" "}
                <a className="styleaslink">
                  <FontAwesomeIcon icon={faRandom} /> Klimarouten
                </a>{" "}
                stellt die Klimaortkarte Wuppertal zusätzlich die Daten der
                Klimarouten, aus dem Open-Data-Angebot (dieses befindet sich in
                Vorbereitung) der Stadt Wuppertal dar, welche ausgewählte
                Fahrrad- und Fußwegrouten symbolisieren (
                <span style={{ whiteSpace: "nowrap" }}>2 Meter</span> Puffer um
                Linienstruktur). Die Routen sind in Kooperation mit{" "}
                <a href="https://www.komoot.de/" target="_komoot">
                  komoot{" "}
                </a>{" "}
                hergestellt worden, wobei sich im jeweiligen Datenblatt{" "}
                <FontAwesomeIcon icon={faInfoCircle} /> der Link zur externen
                Datenquelle befindet. Weitere Objekte, welche sich in einem
                Abstand von{" "}
                <span style={{ whiteSpace: "nowrap" }}>2 Metern</span> zur
                Klimaroute befinden, werden ebenfalls präsentiert bzw. der Route
                zugeordnet:
                <ul>
                  <li>Klimaorte</li>
                  <li>
                    Aussichtspunkte und die von dort sichtbaren Klimaorte
                    (Open-Data-Angebot befindet sich in Vorbereitung)
                  </li>
                  <li>
                    Zwischenstopps, als Symbol für weitere Highlights im
                    Routenverlauf (Open-Data-Angebot befindet sich in
                    Vorbereitung)
                  </li>
                  <li>
                    ausgewählte Point of Interests (
                    <a
                      href="https://offenedaten-wuppertal.de/dataset/interessante-orte-poi-wuppertal"
                      target="_opendata"
                    >
                      Interessante Orte Wuppertal
                    </a>
                    , Anpassung des Open-Data-Angebots befindet sich in
                    Vorbereitung).
                  </li>
                </ul>
              </div>
            </div>
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
              className="useAClassNameToRenderProperLink"
              to="filter"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("filter")}
            >
              Meine Klimaorte
            </Link>
            , um die in der Karte angezeigten vorbildlichen Klimaorte auf die
            für Sie relevanten Themen zu beschränken. Über{" "}
            <Link
              className="useAClassNameToRenderProperLink"
              to="settings"
              containerId="myMenu"
              smooth={true}
              delay={100}
              onClick={() => setAppMenuActiveMenuSection("settings")}
            >
              Einstellungen
            </Link>{" "}
            können Sie die Darstellung der Hintergrundkarte und der
            klimarelevanten Themen an Ihre Interesse anpassen. Wählen Sie die{" "}
            <Link
              className="useAClassNameToRenderProperLink"
              to="help"
              containerId="myMenu"
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
            key="filter"
            sectionKey="filter"
            sectionTitle={getFilterHeader()}
            sectionBsStyle="primary"
            sectionContent={
              <>
                <FilterPanel filterConfiguration={filterConfiguration} />
                <p style={{ paddingTop: 10 }}>
                  Die getroffene Filterung wirkt sich nur auf den Bereich{" "}
                  <a className="styleaslink">
                    <FontAwesomeIcon icon={faRandom} /> Klimaorte
                  </a>{" "}
                  aus (nicht auf den Bereich{" "}
                  <a className="styleaslink">
                    <FontAwesomeIcon icon={faRandom} /> Klimarouten
                  </a>
                  ).
                </p>
              </>
            }
          />,
          <DefaultSettingsPanel
            skipFilterTitleSettings={true}
            key="settings"
            previewMapPosition="lat=51.2559579192051&lng=7.14642942709672&zoom=13"
            previewFeatureCollection={previewFeatureCollection}
          />,
          <Section
            key="help"
            sectionKey="help"
            sectionTitle="Kompaktanleitung"
            sectionBsStyle="default"
            sectionContent={
              <ConfigurableDocBlocks configs={configurableDocBlocks} />
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
