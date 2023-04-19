import React, { useContext } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import {
  faBicycle,
  faRoute,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeatureCollectionContext } from "react-cismap/contexts/FeatureCollectionContextProvider";
import { getSymbolSVGGetter } from "react-cismap/tools/uiHelper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,

  Title,
  Tooltip,
  Filler,
  Legend
);

export default function ElevationChart({ elevationData }) {
  // attention: the elevationData is not sorted by station
  const { selectedFeature, items, allFeatures, itemsDictionary } = useContext(
    FeatureCollectionContext
  );
  const sampleSvg = allFeatures[0].properties.svgBadge;
  const sampleSvgDimensions = allFeatures[0].properties.svgBadgeDimension;
  let maxElevation = 0;
  const stations = [];
  const elevations = [];
  const routePointsInStations = [];

  for (const station of Object.keys(elevationData)) {
    stations.push(station);
  }

  stations.sort((a, b) => a - b);
  let i = 0;
  for (const station of stations) {
    if (elevationData[station].z) {
      elevations.push(elevationData[station].z);
    } else {
      elevations.push(null);
    }
  }
  for (const elevation of elevations) {
    if (elevation === null) {
      let lower = 0;
      let upper = elevations.slice(-1); //last elevation in array
      if (i > 0 && i < elevations.length) {
        lower = elevations[i - 1];
        upper = elevations[i + 1];
      } else if (i === 0) {
        upper = elevations[i + 1];
      } else if (i === elevations.length) {
        lower = elevations[i - 1];
      }
      const fakeElevation = (lower + upper) / 2;
      elevations[i] = fakeElevation;
    }
    i++;
    maxElevation = Math.max(maxElevation, elevation);
  }
  i = 0;
  for (const station of stations) {
    if (elevationData[station].routepoint) {
      routePointsInStations.push({
        routepoint: elevationData[station].routepoint,
        z: elevations[i],
      });
    } else {
      routePointsInStations.push(null);
    }
    i++;
  }
  const labels = stations;

  const options = {
    animation: false,
    onHover: function (e, item) {
      // add hover here!!!
    },
    responsive: true,
    interaction: {
      intersect: false,
      mode: "nearest",
    },

    tooltip: {
      position: "nearest",
    },
    plugins: {
      title: {
        align: "end",
        display: false,
        text: "Distanz, m / Höhe, m",
      },
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        position: "nearest",

        callbacks: {
          title: (tooltipItems) => {
            return "Entfernung: " + tooltipItems[0].label + "m";
          },
          label: (tooltipItem) => {
            // console.log("tooltipitem,", tooltipItem);
            if (tooltipItem.dataset.name === "elevation") {
              return "Höhe: " + tooltipItem.raw + "m";
            } else {
              // console.log(
              //   "routePointsInStations[tooltipItem.dataIndex].routepoint",
              //   routePointsInStations[tooltipItem.dataIndex]
              // );
              const rp =
                routePointsInStations[tooltipItem.dataIndex]?.routepoint;
              if (rp) {
                const name = rp.name;
                const type = rp.type;
                return name + " (" + elevations[tooltipItem.dataIndex] + "m)";
              } else {
                return null;
              }
            }
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        beginAtZero: true,
        max: Math.round(labels[labels.length - 1]),
      },

      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };
  const svgCode = getSymbolSVGGetter(sampleSvg, sampleSvgDimensions)(
    24,
    "green",
    "angebot_4711"
  );
  const blob = new Blob([sampleSvg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  // img.src =
  //   "https://wunda-geoportal.cismet.de/poi-signaturen/Icon_Platz_farbig.svg";
  img.src = url;

  //calculate the y Value of the routepoints as a round up to the next 50 from maxElevation
  const virtualElevationForRoutePoints = Math.ceil(maxElevation / 50) * 50;

  const data = {
    labels,
    datasets: [
      {
        type: "bubble",
        name: "routePoints",
        fill: false,
        pointRadius: 10,
        pointHoverRadius: 0,
        pointHitRadius: 100,
        _pointStyle: (context) => {
          return img;
        },
        pointStyle: "rect",
        data: routePointsInStations.map((item) => {
          if (item?.z) {
            return virtualElevationForRoutePoints;
          } else {
            return null;
          }
        }),
        // borderColor: (context) => {
        //   console.log("borderColor context", context);

        //   return "red";
        // },
        // backgroundColor: (context) => "red",
        _borderColor: "rgb(53, 162, 235)",
        _backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        type: "line",
        name: "elevation",
        fill: true,

        pointHoverRadius: 0,
        pointHitRadius: 0,
        pointRadius: 0,
        data: elevations,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Chart style={{ maxHeight: 200 }} options={options} data={data} />;
}
