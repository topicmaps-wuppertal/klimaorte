(this["webpackJsonpbestpractices-klimaschutz"]=this["webpackJsonpbestpractices-klimaschutz"]||[]).push([[0],{306:function(e,t,n){},394:function(e,t,n){},704:function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i),a=n(21),l=n.n(a),d=(n(394),n(287),n(288),n(289),n(80)),o=n(9),s=n(22),c=n(165),u=n(46),h=(n(305),n(378)),b=(n(306),n(10)),j=function(e){var t=e.filterState,n=e.filterMode;return function(e){var i;if("themen"===n)return null===t||void 0===t||null===(i=t.themen)||void 0===i?void 0:i.includes(e.thema.id);if("kategorien"===n){var r,a=Object(b.a)(e.kategorien);try{for(a.s();!(r=a.n()).done;){var l,d=r.value;if(null===t||void 0===t||null===(l=t.kategorien)||void 0===l?void 0:l.includes(d))return!0}}catch(o){a.e(o)}finally{a.f()}return!1}return!0}},m=n(24),v=n.n(m),g=n(49),f=n(144),p=n(4),O=function(){var e=Object(g.a)(v.a.mark((function e(t){var n,i,r,a,l,d,o,s,c,u,h;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(f.b)(t,(function(e){return e.thema.icon}));case 2:return s=e.sent,c=(null===s||void 0===s||null===(n=s.standort)||void 0===n?void 0:n.name)||"Kein Standort","Feature",!1,u=null===s||void 0===s||null===(i=s.standort)||void 0===i?void 0:i.geojson,null===s||void 0===s||null===(r=s.thema)||void 0===r?void 0:r.farbe,s.color=null===s||void 0===s?void 0:s.thema.farbe,h={header:s.thema.name,title:c,additionalInfo:null===s||void 0===s?void 0:s.beschreibung,subtitle:Object(p.jsxs)("span",{children:[null===s||void 0===s||null===(a=s.standort)||void 0===a?void 0:a.strasse," ",null===s||void 0===s||null===(l=s.standort)||void 0===l?void 0:l.hausnummer,Object(p.jsx)("br",{}),null===s||void 0===s||null===(d=s.standort)||void 0===d?void 0:d.plz," ",null===s||void 0===s||null===(o=s.standort)||void 0===o?void 0:o.stadt]})},s.info=h,s.url=null===s||void 0===s?void 0:s.website,s.bild&&(s.foto="https://www.wuppertal.de/geoportal/standort_klima/fotos/"+s.bild),e.abrupt("return",{text:c,type:"Feature",selected:false,geometry:u,crs:{type:"name",properties:{name:"urn:ogc:def:crs:EPSG::25832"}},properties:s});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x=function(e){var t,n,i,r=e.featureCollectionContext,a=function(e){var t,n,i=null===r||void 0===r||null===(t=r.items)||void 0===t?void 0:t.find((function(t){var n;return(null===t||void 0===t||null===(n=t.thema)||void 0===n?void 0:n.id)===e}));return null===i||void 0===i||null===(n=i.thema)||void 0===n?void 0:n.name},l="?";if((null===r||void 0===r||null===(t=r.filteredItems)||void 0===t?void 0:t.length)===(null===r||void 0===r||null===(n=r.items)||void 0===n?void 0:n.length))l=void 0;else if("themen"===(null===r||void 0===r?void 0:r.filterMode)){var d,o;if((null===r||void 0===r||null===(d=r.filterState)||void 0===d||null===(o=d.themen)||void 0===o?void 0:o.length)<=2){var s,c,u=null===r||void 0===r||null===(s=r.filterState)||void 0===s?void 0:s.themen,h=[],j=Object(b.a)(u);try{for(j.s();!(c=j.n()).done;){var m=c.value;h.push(a(m))}}catch(S){j.e(S)}finally{j.f()}l="nach Themen gefiltert (nur "+h.join(", ")+")"}else{var v,g;l="nach Themen gefiltert ("+(null===r||void 0===r||null===(v=r.filterState)||void 0===v||null===(g=v.themen)||void 0===g?void 0:g.length)+" Themen)"}}else if("kategorien"===(null===r||void 0===r?void 0:r.filterMode)){var f,O,x,k,w,y;if((null===r||void 0===r||null===(f=r.filterState)||void 0===f||null===(O=f.kategorien)||void 0===O?void 0:O.length)<=3)l="nach Kategorien gefiltert (nur "+(null===r||void 0===r||null===(x=r.filterState)||void 0===x||null===(k=x.kategorien)||void 0===k?void 0:k.join(", "))+")";else l="nach Kategorien gefiltert ("+(null===r||void 0===r||null===(w=r.filterState)||void 0===w||null===(y=w.kategorien)||void 0===y?void 0:y.length)+" Kategorien)"}return 0===(null===r||void 0===r||null===(i=r.filteredItems)||void 0===i?void 0:i.length)?Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Keine Klimaorte gefunden!"})," Bitte \xfcberpr\xfcfen Sie Ihre Filtereinstellungen."]}):l?Object(p.jsxs)("div",{children:[Object(p.jsx)("b",{children:"Meine Klimaorte:"})," ",l]}):void 0},k=n(19),w=n(168),y=n(88),S=n(218),z=n(388),K=n(386),F=n(7),A=n(17),C=n(20),T=n(89),D=n(225),M=n(118),B=n(387),I=n(234),P=n(231),L="1.0.2",E=function(){return L},W=n(147),N=function(){var e=Object(i.useContext)(C.b).setAppMenuActiveMenuSection;return Object(p.jsxs)("div",{style:{fontSize:"11px"},children:[Object(p.jsx)("b",{children:"Hintergrundkarten"}),": Stadtkarte 2.0 \xa9 RVR | True Orthophoto 2020 \xa9 Stadt Wuppertal"," ",Object(p.jsx)("a",{className:"pleaseRenderAsLink",onClick:function(){e("help"),T.scroller.scrollTo("Datengrundlage",{containerId:"myMenu"})},children:"(Details und Nutzungsbedingungen)"}),Object(p.jsx)("br",{}),Object(p.jsxs)("div",{children:[Object(p.jsxs)("b",{children:[document.title," v",E()]}),":"," ",Object(p.jsx)("a",{href:"https://cismet.de/",target:"_cismet",children:"cismet GmbH"})," ","auf Basis von"," ",Object(p.jsx)("a",{href:"http://leafletjs.com/",target:"_more",children:"Leaflet"})," ","und"," ",Object(p.jsxs)("a",{href:"https://cismet.de/#refs",target:"_cismet",children:["cids | react-cismap v",W.a]})," ","|"," ",Object(p.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://cismet.de/datenschutzerklaerung.html",children:"Datenschutzerkl\xe4rung (Privacy Policy)"})]})]})},H=n(84),_=function(){var e,t=Object(i.useContext)(C.b).setAppMenuActiveMenuSection,n=Object(i.useContext)(A.a),r=n.filterState,a=n.filterMode,l=n.filteredItems,d=n.shownFeatures,s=Object(i.useContext)(A.b),c=s.setFilterState,h=s.setFilterMode,j=Object(i.useContext)(A.a).items,m=[],v=[],g=[],f=[],O=Object(b.a)(j||[]);try{for(O.s();!(e=O.n()).done;){var x,k=e.value,w=Object(b.a)(k.kategorien);try{for(w.s();!(x=w.n()).done;){var y=x.value;m.includes(y)||(v.push({key:y}),m.push(y))}}catch(U){w.e(U)}finally{w.f()}g.includes(k.thema.id)||(g.push(k.thema.id),f.push({key:k.thema.id,title:k.thema.name,color:k.thema.farbe}))}}catch(U){O.e(U)}finally{O.f()}f.sort((function(e,t){return e.title.localeCompare(t.title)})),v.sort((function(e,t){return e.key.localeCompare(t.key)})),g=[];for(var S=0,z=f;S<z.length;S++){var K=z[S];g.push(K.key)}m=[];for(var L=0,E=v;L<E.length;L++){var W=E[L];m.push(W.key)}var _={mode:"tabs",filters:[{title:"Themen",key:"themen",icon:"folder",type:"tags",values:f,setAll:function(){c(Object(F.a)(Object(F.a)({},r),{},{themen:g}))},setNone:function(){c(Object(F.a)(Object(F.a)({},r),{},{themen:[]}))},colorizer:function(e,t){return t?e.color:"#eeeeee"}},{title:"Kategorien",key:"kategorien",icon:"tags",type:"tags",values:v,setAll:function(){c(Object(F.a)(Object(F.a)({},r),{},{kategorien:m}))},setNone:function(){c(Object(F.a)(Object(F.a)({},r),{},{kategorien:[]}))}}]};void 0===r&void 0!==j&&c({kategorien:m,themen:g}),void 0===a&void 0!==j&&h("themen");var G=Object(u.d)("Hintergrund",{content:'Die M\xf6glichkeiten zum Klima- und Umweltschutz werden aktuell global diskutiert, wobei bereits \n              auf kommunaler Ebene viele Akteure und Einrichtungen an deren Umsetzung beteiligt sind. \n              An diesen "Klimaorten" wird das Thema Klimaschutz praktiziert und vermittelt; hier wird der \n              Klimaschutz f\xfcr die B\xfcrger\\*innen erlebbar. Viele dieser Klimaorte sind im Rahmen von innovativen \n              Projekten durch den Wissenstransfer und das Engagement von Unternehmen, Vereinen, Verb\xe4nden sowie \n              Quartiersbewohner\\*innen entstanden, die sich aktiv f\xfcr L\xf6sungen zum Klima- und Umweltschutz in ihrem \n              Quartier und f\xfcr die Stadt Wuppertal einsetzen. Zu den zielf\xfchrenden Projekten geh\xf6ren z.B. Wuppertals \n              Klimasiedlungen, Anlagen zur effizienten und/oder regenerativen Energieerzeugung, Projekte der Verkehrswende \n              sowie der Klima- und Umweltbildung, an denen zahlreiche Akteure mitwirken und mitgestalten.'});return G[0].configs.splice(6,0,{title:"Filtern",bsStyle:"warning",contentBlockConf:{type:"REACTCOMP",content:Object(p.jsxs)("div",{children:[Object(p.jsxs)("p",{children:['Im Bereich "',Object(p.jsx)("strong",{children:"Meine Klimaorte"}),'" k\xf6nnen Sie im Anwendungsmen\xfc'," ",Object(p.jsx)(o.a,{name:"bars"})," die in der Karte angezeigten Klimaorte so ausd\xfcnnen, dass nur die f\xfcr Sie interessanten Orte \xfcbrig bleiben. Dabei umfasst die Filterung die Angebote an den Klimastandorten, wobei sich ein Angebot aus einem Thema und einer Kategorie ergibt. Standardm\xe4\xdfig sind die Einstellungen hier so gesetzt, dass alle verf\xfcgbaren Klimaorte angezeigt werden."]}),Object(p.jsxs)("p",{children:['Ihnen stehen somit zwei Filterkriterien zur Verf\xfcgung: "Themen" und "Kategorien". Innerhalb dieser Kriterien k\xf6nnen sie in einer alphabetisch sortieren Menge an Schlagworten (Tags) bestimmte Begriffe per Mausklick selektieren bzw. deselektieren; die Auswahl aller bzw. keines der Schlagworte erfolgt \xfcber die Schaltfl\xe4che'," ",Object(p.jsx)("a",{className:"renderAsLink",children:"alle"})," bzw. ",Object(p.jsx)("a",{className:"renderAsLink",children:"keine"}),"."]}),Object(p.jsxs)("p",{children:['Ihre Einstellungen werden direkt in der blauen Titelzeile des Bereichs "',Object(p.jsx)("strong",{children:"Meine Klimaorte"}),'" und in dem Donut-Diagramm, das Sie rechts neben oder unter den Filteroptionen finden, ausgewertet. Die Titelzeile zeigt die Gesamtanzahl der Klimaorte, die den von Ihnen gesetzten Filterbedingungen entsprechen. Das Donut-Diagramm zeigt zus\xe4tzlich die Verteilung der Klimaorte entsprechend der Filterkriterien "Themen" oder "Kategorien". Bewegen Sie dazu den Mauszeiger auf eines der farbigen Segmente des Diagramms. Die Farben des Donut-Diagramms entsprechen den farbigen Hintergr\xfcnden der Schlagworte aus dem Filterkriterium "Themen".']})]})}}),Object(p.jsx)(H.b,{customizations:{inKartePositionieren:{listWithSymbols:Object(p.jsxs)("p",{children:["Durch das in der Auswahlliste vorangestellte Symbol erkennen Sie, ob es sich bei einem Treffer um einen"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"circle"})," Stadtbezirk"]}),", ein"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"pie-chart"})," Quartier"]}),", eine"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"home"})," Adresse"]}),", eine"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"road"})," Stra\xdfe ohne Hausnummern"]}),", eine"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"child"})," Kindertageseinrichtung"]}),", eine"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"graduation-cap"})," Schule"]})," ","oder einen"," ",Object(p.jsxs)(R,{children:[Object(p.jsx)(o.a,{name:"sun"})," Klimaort"]})," ","handelt."]})},fachobjekteAuswaehlen:{furtherExplanationOfClickableContent:" (Signaturen oder dunkelblaue Fahrradtrassen)"},hintergrund:{additionalDatasources:Object(p.jsxs)("div",{children:[Object(p.jsx)("ul",{children:Object(p.jsxs)("li",{children:[Object(p.jsx)("strong",{children:"Fernw\xe4rme"}),": Kartendienst (WMS) der Stadt Wuppertal in Zusammenarbeit mit der"," ",Object(p.jsx)("a",{target:"_wsw",href:"https://www.wsw-online.de/wsw-energie-wasser/privatkunden/produkte/fernwaerme/talwaerme-wuppertal/",children:"WSW GmbH"}),". Datengrundlage: Fernw\xe4rmeleitungen der Wuppertaler Stadtwerke GmbH (Stand 02.2021) mit einer Puffergr\xf6\xdfe von 10 m. \xa9"," ",Object(p.jsx)("a",{target:"_wsw",href:"https://www.wsw-online.de/impressum/",children:"Wuppertaler Stadtwerke GmbH"}),"."]})}),Object(p.jsx)("div",{children:"Zus\xe4tzlich stellt die Klimaortkarte Wuppertal die Daten der Klimaorte dar. Die Aufbereitung dieses Datensatzes f\xfcr das Open-Data-Portal befindet sich aktuell in der Umsetzung. Nach der \xf6ffentlichen Bereitstellung wird die Quelle an dieser Position aufgef\xfchrt."})]})}},children:Object(p.jsx)(D.a,{menuIcon:"bars",menuTitle:"Meine Klimaorte, Einstellungen und Kompaktanleitung",menuFooter:Object(p.jsx)(N,{}),menuIntroduction:Object(p.jsxs)("span",{children:["Benutzen Sie die Auswahlm\xf6glichkeiten unter"," ",Object(p.jsx)(T.Link,{className:"useAClassNameToRenderProperLink",to:"filter",containerId:"myMenu",smooth:!0,delay:100,onClick:function(){return t("filter")},children:"Meine Klimaorte"}),", um die in der Karte angezeigten vorbildlichen Klimaorte auf die f\xfcr Sie relevanten Themen zu beschr\xe4nken. \xdcber"," ",Object(p.jsx)(T.Link,{className:"useAClassNameToRenderProperLink",to:"settings",containerId:"myMenu",smooth:!0,delay:100,onClick:function(){return t("settings")},children:"Einstellungen"})," ","k\xf6nnen Sie die Darstellung der Hintergrundkarte und der klimarelevanten Themen an Ihre Interesse anpassen. W\xe4hlen Sie die"," ",Object(p.jsx)(T.Link,{className:"useAClassNameToRenderProperLink",to:"help",containerId:"myMenu",smooth:!0,delay:100,onClick:function(){return t("help")},children:"Kompaktanleitung"})," ","f\xfcr detailliertere Bedienungsinformationen."]}),menuSections:[Object(p.jsx)(M.a,{sectionKey:"filter",sectionTitle:function(){var e,t=(null===l||void 0===l?void 0:l.length)||0;return e=1===t?"Standort":"Standorte","Meine Klimaorte (".concat(t," ").concat(e," gefunden, davon ").concat((null===d||void 0===d?void 0:d.length)||"0"," in der Karte)")}(),sectionBsStyle:"primary",sectionContent:Object(p.jsx)(B.a,{filterConfiguration:_})},"filter"),Object(p.jsx)(I.a,{},"settings"),Object(p.jsx)(M.a,{sectionKey:"help",sectionTitle:"Kompaktanleitung",sectionBsStyle:"default",sectionContent:Object(p.jsx)(P.a,{configs:G})},"help")]})})},R=function(e){return Object(p.jsx)("span",{style:{whiteSpace:"nowrap"},children:e.children})},G=n(286),U=n(389),V=function(){var e=Object(i.useContext)(A.a),t=e.selectedFeature,n=e.items,r=null===t||void 0===t?void 0:t.properties,a=Object(p.jsx)("div",{style:{fontSize:"11px"},children:Object(p.jsxs)("div",{children:[Object(p.jsxs)("b",{children:[document.title," v",E()]}),":"," ",Object(p.jsx)("a",{href:"https://cismet.de/",target:"_cismet",children:"cismet GmbH"})," ","auf Basis von"," ",Object(p.jsx)("a",{href:"http://leafletjs.com/",target:"_more",children:"Leaflet"})," ","und"," ",Object(p.jsxs)("a",{href:"https://cismet.de/#refs",target:"_cismet",children:["cids | react-cismap v",W.a]})," ","|"," ",Object(p.jsx)("a",{target:"_blank",rel:"noopener noreferrer",href:"https://cismet.de/datenschutzerklaerung.html",children:"Datenschutzerkl\xe4rung (Privacy Policy)"})]})});if(void 0!==r){var l,d,o,s,c,u,h,j,m,v,g,f,O,x;void 0!==r.bild&&(x="https://www.wuppertal.de/geoportal/standort_klima/fotos/"+r.bild);var k,w=n.filter((function(e){return(null===e||void 0===e?void 0:e.standort.id)===r.standort.id&&e.id!==r.id})),y={},S=Object(b.a)(w);try{for(S.s();!(k=S.n()).done;){var z=k.value;void 0===y[z.thema.name]&&(y[z.thema.name]=[]),y[z.thema.name].push(z.kategorien)}}catch(T){S.e(T)}finally{S.f()}var K=[Object(p.jsx)(G.a,{bsStyle:"info",header:"Standort: "+(null===r||void 0===r||null===(l=r.standort)||void 0===l?void 0:l.name),children:Object(p.jsxs)("div",{style:{fontSize:"115%",padding:"10px",paddingTop:"0px"},children:[(null===r||void 0===r?void 0:r.standort)&&Object(p.jsxs)("b",{children:[null===r||void 0===r||null===(d=r.standort)||void 0===d?void 0:d.strasse," ",null===r||void 0===r||null===(o=r.standort)||void 0===o?void 0:o.hausnummer,Object(p.jsx)("br",{}),null===r||void 0===r||null===(s=r.standort)||void 0===s?void 0:s.plz," ",null===r||void 0===r||null===(c=r.standort)||void 0===c?void 0:c.stadt,Object(p.jsx)("br",{})]}),(null===r||void 0===r||null===(u=r.standort)||void 0===u?void 0:u.beschreibung)&&Object(p.jsxs)("div",{children:[null===r||void 0===r||null===(h=r.standort)||void 0===h?void 0:h.beschreibung,Object(p.jsx)("br",{})]}),(null===r||void 0===r||null===(j=r.standort)||void 0===j?void 0:j.bemerkung)&&Object(p.jsxs)("div",{children:[null===r||void 0===r||null===(m=r.standort)||void 0===m?void 0:m.bemerkung," ",Object(p.jsx)("br",{})]}),(null===r||void 0===r||null===(v=r.standort)||void 0===v?void 0:v.kommentar)&&Object(p.jsxs)("div",{children:[Object(p.jsx)("br",{})," ",Object(p.jsxs)("i",{children:[null===r||void 0===r||null===(g=r.standort)||void 0===g?void 0:g.kommentar," "]})]}),(null===r||void 0===r||null===(f=r.standort)||void 0===f?void 0:f.erreichbarkeit)&&Object(p.jsxs)("div",{children:[Object(p.jsx)("br",{})," Erreichbarkeit \xfcber ",null===r||void 0===r||null===(O=r.standort)||void 0===O?void 0:O.erreichbarkeit]})]})},"standort")],F=!0;w.length>0&&K.push(Object(p.jsx)(G.a,{header:"Weitere Angebote an diesem Standort:",bsStyle:"success",children:Object(p.jsx)("div",{style:{fontSize:"115%",padding:"10px",paddingTop:"0px"},children:Object(p.jsx)("table",{border:0,style:{xwidth:"100%"},children:Object(p.jsx)("tbody",{children:Object.keys(y).map((function(e,t){var n=null;return!0!==F&&(n=Object(p.jsxs)("tr",{colspan:2,children:[Object(p.jsx)("td",{style:{paddingLeft:5,paddingright:5,borderBottom:"1px solid #dddddd"}}),Object(p.jsx)("td",{style:{paddingLeft:5,paddingright:5,borderBottom:"1px solid #dddddd"}})]})),F=!1,Object(p.jsxs)(p.Fragment,{children:[n,Object(p.jsxs)("tr",{style:{paddingBottom:10},children:[Object(p.jsxs)("td",{style:{verticalAlign:"top",padding:5},children:[e,":"]},"addAng.L."+t),Object(p.jsx)("td",{style:{verticalAlign:"top",padding:5},children:y[e].map((function(e,t){return Object(p.jsx)("div",{children:e.join(", ")},"kategorien."+t)}))},"addAng.R."+t)]},"addAng"+t)]})}))})})})},"weitereAngebote"));var C=void 0;return void 0!==x&&(C=250),Object(p.jsx)(U.a,{titleIconName:"info-circle",title:"Datenblatt: "+r.kategorien.join(", "),mainSection:Object(p.jsxs)("div",{style:{width:"100%",minHeight:C},children:[void 0!==x&&Object(p.jsx)("img",{alt:"Bild",style:{paddingLeft:10,paddingRight:10,float:"right",paddingBottom:"5px"},src:x,width:"250"}),Object(p.jsxs)("div",{style:{fontSize:"115%",padding:"10px",paddingTop:"0px"},children:[r.beschreibung&&Object(p.jsxs)("b",{children:[r.beschreibung,Object(p.jsx)("br",{})]}),r.bemerkung&&Object(p.jsxs)("div",{children:[r.bemerkung," ",Object(p.jsx)("br",{})]}),r.kommentar&&Object(p.jsxs)("div",{children:[Object(p.jsx)("br",{}),Object(p.jsxs)("i",{children:[r.kommentar," "]})]})]})]}),subSections:K,footer:a})}return null},Q=function(){var e=Object(g.a)(v.a.mark((function e(t){var n,i,r;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="GazDataForStories",i={},e.next=4,Object(y.c)(n,q+"/data/adressen.json");case 4:return i.adressen=e.sent,e.next=7,Object(y.c)(n,q+"/data/bezirke.json");case 7:return i.bezirke=e.sent,e.next=10,Object(y.c)(n,q+"/data/quartiere.json");case 10:return i.quartiere=e.sent,e.next=13,Object(y.c)(n,q+"/data/bpklimastandorte.json");case 13:i.bpklimastandorte=e.sent,r=Object(S.b)(i,["bpklimastandorte","bezirke","quartiere","adressen"]),t(r);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var Z=function(){var e=Object(i.useContext)(A.b),t=e.setSelectedFeatureByPredicate,n=(e.setFilterState,Object(i.useContext)(A.a)),r=n.selectedFeature,a=n.items,l=Object(i.useContext)(s.b).zoomToFeature,d=Object(i.useState)([]),o=Object(k.a)(d,2),c=o[0],u=o[1];Object(i.useEffect)((function(){Q(u)}),[]);var h,b,j=null===r||void 0===r?void 0:r.properties,m=!1;return j&&(m=a.filter((function(e){return(null===e||void 0===e?void 0:e.standort.id)===j.standort.id&&e.id!==j.id})).length>0||void 0!==(null===r||void 0===r||null===(h=r.properties)||void 0===h?void 0:h.bemerkung)||void 0!==(null===r||void 0===r||null===(b=r.properties)||void 0===b?void 0:b.kommentar)),Object(p.jsx)(K.a,{applicationMenuTooltipString:"Filter | Einstellungen | Anleitung",locatorControl:!0,modalMenu:Object(p.jsx)(_,{}),gazData:c,gazetteerSearchPlaceholder:"Klimaort | Stadtteil | Adresse",infoBox:Object(p.jsx)(z.a,{pixelwidth:400,config:{displaySecondaryInfoAction:m,city:"Wuppertal",navigator:{noun:{singular:"Klimaort",plural:"Klimaorte"}},noCurrentFeatureTitle:"Keine Klimaorte gefunden",noCurrentFeatureContent:""}}),secondaryInfo:Object(p.jsx)(V,{}),gazetteerHitTrigger:function(e){var n,i;Array.isArray(e)&&(null===(n=e[0])||void 0===n||null===(i=n.more)||void 0===i?void 0:i.id)&&t((function(t){try{var n=parseInt(t.properties.standort.id)===e[0].more.id;return!0===n&&l(t),n}catch(i){return!1}}))},children:Object(p.jsx)(w.a,{})})},q="https://wupp-topicmaps-data.cismet.de";var J=function(){return Object(p.jsx)(s.c,{appKey:"BestPracticeKlimaschutzWuppertal.TopicMap",featureTooltipFunction:function(e){return null===e||void 0===e?void 0:e.text},featureItemsURL:q+"/data/bpklima.data.json",referenceSystemDefinition:d.b.proj4crs25832def,mapEPSGCode:"25832",referenceSystem:d.b.crs25832,getFeatureStyler:h.a,convertItemToFeature:O,clusteringOptions:{iconCreateFunction:Object(u.c)(30,(function(e){return e.color}))},clusteringEnabled:!0,itemFilterFunction:j,titleFactory:x,classKeyFunction:function(e){var t;return null===(t=e.thema)||void 0===t?void 0:t.name},getColorFromProperties:function(e){var t;return null===e||void 0===e||null===(t=e.thema)||void 0===t?void 0:t.farbe},additionalLayerConfiguration:{fernwaerme:{title:Object(p.jsxs)("span",{children:["Fernw\xe4rme"," ",Object(p.jsx)(o.a,{style:{color:"#EEB48C",width:"30px",textAlign:"center"},name:"circle"})]}),initialActive:!0,layer:Object(p.jsx)(c.a,{url:"https://maps.wuppertal.de/deegree/wms",layers:"fernwaermewsw ",format:"image/png",tiled:"true",transparent:"true",maxZoom:19,opacity:.7},"fernwaermewsw")}},children:Object(p.jsx)(Z,{})})},X=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,710)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,a=t.getLCP,l=t.getTTFB;n(e),i(e),r(e),a(e),l(e)}))};l.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(J,{})}),document.getElementById("root")),X()}},[[704,1,2]]]);
//# sourceMappingURL=main.255adf6c.chunk.js.map