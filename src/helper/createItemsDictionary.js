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
            currentStandortInCache.push({ typ: "standort", id: ort.id });
          } else {
            standorteInRouten[item.id] = [{ typ: "standort", id: ort.id }];
          }
        } else if (ort.typ === "aussichtspunkt") {
          additionalSelectableItemsCount++;

          const currentStandortInCache = standorteInRouten[item.id];

          if (currentStandortInCache) {
            currentStandortInCache.push({ typ: "aussichtspunkt", id: ort.id });
          } else {
            standorteInRouten[item.id] = [{ typ: "aussichtspunkt", id: ort.id }];
          }

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
              currentStandortInCache.push({ typ: "standort", id: aussichtspunktort.id });
            } else {
              standorteInRouten[item.id] = [{ typ: "standort", id: aussichtspunktort.id }];
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
    for (const standortInRoute of standorteInRouten[route.id]) {
      if (standortInRoute.typ === "standort") {
        const standortId = standortInRoute.id;
        for (const angebotId of angeboteInStandorte[standortId]) {
          const angebot = angebote[angebotId];
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
  }

  //add angebote to angeboteInRouten
  for (const routenId of Object.keys(routen)) {
    angeboteInRouten[routenId] = [];
    for (const standortInRoute of standorteInRouten[routenId]) {
      if (standortInRoute.typ === "standort") {
        const standortId = standortInRoute.id;
        for (const angebotId of angeboteInStandorte[standortId]) {
          angeboteInRouten[routenId].push(angebotId);
        }
      }
    }
  }

  const dict = {
    items,
    allStandorteInRouten,
    standorteInRouten,
    angeboteInStandorte,
    angeboteInRouten,
    angebote,
    routen,
    additionalSelectableItemsCount,
  };
  console.log("yyy dictionary", dict);

  return dict;
};

export default createItemsDictionary;
