const createItemsDictionary = (items) => {
  const allStandorteInRouten = [];
  const standorteInRouten = {};
  const angeboteInRouten = {};
  const angeboteInStandorte = {};
  const routen = {};
  const angebote = {};

  console.log("xxx createItemsDictionary");

  //combined run
  // save all standortids in angeboteInStandorte
  // save all ort.id's that are in routen

  let additionalSelectableItemsCount = 0;

  for (const item of items) {
    if (item.typ === "route") {
      //
      routen[item.id] = item;
      //orte in routen
      for (const ort of item.routenpunkte) {
        if (ort.typ === "klimaort") {
          allStandorteInRouten.push(ort.id);
          const currentStandortInCache = standorteInRouten[item.id];
          if (currentStandortInCache) {
            currentStandortInCache.push(ort.id);
          } else {
            standorteInRouten[item.id] = [ort.id];
          }
        } else if (ort.typ === "aussichtspunkt") {
          additionalSelectableItemsCount++;

          ort.routen = [{ id: item.id, typ: "route", name: item.name }]; // achtung hier noch array möglichkeit vorsehen
          for (const aussichtspunktort of ort.klimaorte) {
            allStandorteInRouten.push(aussichtspunktort.id);
            const currentStandortInCache = standorteInRouten[item.id];
            if (currentStandortInCache) {
              currentStandortInCache.push(aussichtspunktort.id);
            } else {
              standorteInRouten[item.id] = [aussichtspunktort.id];
            }
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

  for (const route of Object.values(routen)) {
    for (const standortId of standorteInRouten[route.id]) {
      for (const angebotId of angeboteInStandorte[standortId]) {
        angebote[angebotId].routen = [{ id: route.id, typ: "route", name: route.name }]; // achtung hier noch array möglichkeit vorsehen
      }
    }
  }

  const dict = {
    items,
    allStandorteInRouten,
    standorteInRouten,
    angeboteInStandorte,
    angebote,
    routen,
    additionalSelectableItemsCount,
  };
  console.log("xxx dictionary", dict);

  return dict;
};

export default createItemsDictionary;
