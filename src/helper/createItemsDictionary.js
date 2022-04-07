const createItemsDictionary = (items) => {
  const allStandorteInRouten = [];
  const standorteInRouten = {};
  const angeboteInRouten = {};
  const angeboteInStandorte = {};
  const routen = {};
  const angebote = {};

  //combined run
  // save all standortids in angeboteInStandorte
  // save all ort.id's that are in routen

  let additionalSelectableItemsCount = 0;
  console.log(
    "xx items ",
    items.filter((item) => item.typ === "route")
  );

  for (const item of items) {
    if (item.typ === "route") {
      //
      routen[item.id] = item;
      //orte in routen
      console.log("xx route", item.id);

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
          //add routen subobject to aussichtspunkt
          if (ort.routen) {
            if (ort.routen.filter((r) => r.id === item.id).length === -1) {
              ort.routen.push({ id: item.id, typ: "route", name: item.name });
            }
          } else {
            ort.routen = [{ id: item.id, typ: "route", name: item.name }];
          }
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
  //add routen subobject to angebote
  for (const route of Object.values(routen)) {
    for (const standortId of standorteInRouten[route.id]) {
      for (const angebotId of angeboteInStandorte[standortId]) {
        const angebot = angebote[angebotId];
        if (angebot.id === 70) {
          console.log("stop angebot", angebot);
        }
        if (angebot.routen) {
          if (angebot.routen.filter((r) => r.id === route.id).length === 0) {
            angebot.routen.push({ id: route.id, typ: "route", name: route.name });
          }
        } else {
          angebot.routen = [{ id: route.id, typ: "route", name: route.name }];
        }
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

  return dict;
};

export default createItemsDictionary;
