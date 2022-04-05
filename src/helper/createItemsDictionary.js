const createItemsDictionary = (items) => {
  const orteInRouten = [];

  for (const item of items) {
    if (item.typ === "route") {
      //orte in routen
      for (const ort of item.routenpunkte) {
        if (ort.typ === "klimaort") {
          orteInRouten.push(ort.id);
        } else if (ort.typ === "aussichtspunkt") {
          for (const aussichtspunktort of ort.klimaorte) {
            orteInRouten.push(aussichtspunktort.id);
          }
        }
      }
    }
  }

  return { items, orteInRouten };
};

export default createItemsDictionary;
