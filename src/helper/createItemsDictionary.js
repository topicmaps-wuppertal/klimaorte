const createItemsDictionary = (items) => {
  const standorteInRouten = [];
  const angeboteInStandorte = {};
  const routen = {};
  const angebote = {};

  //combined run
  // save all standortids in angeboteInStandorte
  // save all ort.id's that are in routen
  for (const item of items) {
    if (item.typ === "route") {
      //
      routen[item.id] = item;
      //orte in routen
      for (const ort of item.routenpunkte) {
        if (ort.typ === "klimaort") {
          standorteInRouten.push(ort.id);
        } else if (ort.typ === "aussichtspunkt") {
          for (const aussichtspunktort of ort.klimaorte) {
            standorteInRouten.push(aussichtspunktort.id);
          }
        }
      }
    } else if (item.typ === "ort") {
      angebote[item.id] = item;
      const currentStandortInCache = angeboteInStandorte[item.standort.id];
      if (currentStandortInCache) {
        currentStandortInCache.push(item.id);
      } else {
        angeboteInStandorte[item.standort.id] = [item.id];
      }
    }
  }

  const dict = { items, standorteInRouten, angeboteInStandorte, angebote, routen };
  console.log("xxx dictionary", dict);

  return dict;
};

export default createItemsDictionary;
