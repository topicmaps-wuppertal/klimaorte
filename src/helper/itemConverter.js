import { addSVGToProps, DEFAULT_SVG } from "react-cismap/tools/svgHelper";
const convertBPKlimaItemsToFeature = async (itemIn) => {
  if (itemIn.typ === "ort") {
    let item = await addSVGToProps(itemIn, (i) => i.thema.icon);
    const text = item?.standort?.name || "Kein Standort";
    const type = "Feature";
    const selected = false;
    const geometry = item?.standort?.geojson;
    // item.svg=DEFAULT_SVG.code;
    item.color = item?.thema.farbe;

    const info = {
      header: item.thema.name,
      title: text,
      additionalInfo: item?.beschreibung,
      subtitle: (
        <span>
          {item?.standort?.strasse} {item?.standort?.hausnummer}
          <br />
          {item?.standort?.plz} {item?.standort?.stadt}
        </span>
      ),
    };

    item.info = info;
    item.url = item?.website;
    if (item.bild) {
      item.foto = "https://www.wuppertal.de/geoportal/standort_klima/fotos/" + item.bild;
    }

    const f = {
      text,
      type,
      selected,
      geometry,
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:EPSG::25832",
        },
      },
      properties: item,
    };
    return f;
  } else {
    console.log("itemIn Route", itemIn);

    let item = await addSVGToProps(itemIn, (i) => i.icon);
    const info = {
      header: "Klimaroute",
      title: item?.name,
      additionalInfo: item?.beschreibung,
      subtitle: (
        <span>
          {item?.standort?.strasse} {item?.standort?.hausnummer}
          <br />
          {item?.standort?.plz} {item?.standort?.stadt}
        </span>
      ),
    };

    item.info = info;
    const text = item?.name || "???";
    const type = "Feature";
    const selected = false;
    const geometry = item?.geojsonPoly;
    item.color = "#92BE4D";
    const result = [];

    const route = {
      text,
      type,
      selected,
      geometry,
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:EPSG::25832",
        },
      },
      properties: item,
    };
    result.push(route);
    //check if route contains aussichtspunkte
    if (item.routenpunkte) {
      for (const rp of item.routenpunkte) {
        if (rp.typ === "aussichtspunkt") {
          const rpWithIcon = await addSVGToProps(rp, (i) => "Icon_Aussichtsturm_farbig.svg");
          const aussichtspunkt = {
            text: rp.name,
            type: "Feature",
            selected: false,
            geometry: rp.geom,
            crs: {
              type: "name",
              properties: {
                name: "urn:ogc:def:crs:EPSG::25832",
              },
            },
            properties: {
              ...rpWithIcon,
              color: "#655756",
              info: {
                header: "Aussichtspunkt auf Klimaroute",
                title: rp?.name,
                additionalInfo: `Von diesem Aussichtspunkt aus sehen Sie ${
                  rp?.klimaorte?.length
                } Klimaort${rp?.klimaorte?.length === 1 ? "" : "e"}.`,
                subtitle: (
                  <span>
                    {item?.standort?.strasse} {item?.standort?.hausnummer}
                    <br />
                    {item?.standort?.plz} {item?.standort?.stadt}
                  </span>
                ),
              },
            },
          };
          result.push(aussichtspunkt);
          const aussichtsview = {
            text: rp.name + " (Blickfeld)",
            type: "Feature",
            selected: false,
            preventSelection: true,
            geometry: rp.viewgeom,
            crs: {
              type: "name",
              properties: {
                name: "urn:ogc:def:crs:EPSG::25832",
              },
            },
            properties: rpWithIcon, //{ ...rpWithIcon, typ: "blickfeld" },
          };
          result.push(aussichtsview);
        }
      }
    }
    return result;
  }
};

export default convertBPKlimaItemsToFeature;
