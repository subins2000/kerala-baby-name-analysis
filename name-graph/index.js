import initSqlJs from "sql.js";

import sqlWasm from "sql.js/dist/sql-wasm.wasm?url";
import dbFile from "../data/db.sqlite?url";

const log = msg => document.getElementById("log").innerText += msg
const clearLog = () => document.getElementById("log").innerText = ""

let db;
const init = async () => {
  log("Loading...")
  try {
    const SQL = await initSqlJs({ locateFile: () => sqlWasm });
    const file = await fetch(dbFile)
    const buffer = await file.arrayBuffer()
    const dbData = new Uint8Array(buffer)
    db = new SQL.Database(dbData);
    clearLog()
    runQuery()
  } catch (err) {
    log(err);
  }
}

const makeChart = (series) => {
  const data = Object.keys(series).map(name => {
    return {
      x: series[name].years,
      y: series[name].counts,
      type: 'scatter',
      mode: 'lines+markers',
      name: name
    };
  });

  const yPeak = Math.max(...series[Object.keys(series)[0]].counts)

  const layout = {
    title: 'Babies per born year',
    xaxis: {
      title: 'Year',
      tickmode: 'linear',
      tickangle: -45
    },
    yaxis: {
      title: 'Birth count'
    },
    // shapes: [
    //   {
    //     type: 'line',
    //     x0: 1945,
    //     x1: 1945,
    //     y0: 0,
    //     y1: yPeak - 30,
    //     line: {
    //       width: 2,
    //       dash: 'dot'
    //     }
    //   },
    //   {
    //     type: 'line',
    //     x0: 1962,
    //     x1: 1962,
    //     y0: 0,
    //     y1: yPeak - 80,
    //     line: {
    //       width: 2,
    //       dash: 'dot'
    //     }
    //   },
    //   {
    //     type: 'line',
    //     x0: 1965,
    //     x1: 1965,
    //     y0: 0,
    //     y1: yPeak,
    //     line: {
    //       width: 2,
    //       dash: 'dot'
    //     }
    //   }
    // ],
    // annotations: [
    //   {
    //     x: 1945,
    //     y: yPeak - 30,
    //     text: 'Sheela was born',
    //     showarrow: true,
    //     arrowhead: 2,
    //     ax: 90,
    //     ay: 0
    //   },
    //   {
    //     x: 1962,
    //     y: yPeak - 80,
    //     text: "First movie",
    //     showarrow: true,
    //     arrowhead: 2,
    //     ax: -120,
    //     ay: 0
    //   },
    //   {
    //     x: 1965,
    //     y: yPeak,
    //     text: "Chemmeen movie release",
    //     showarrow: true,
    //     arrowhead: 2,
    //     ax: -120,
    //     ay: 0
    //   }
    // ]
  };

  Plotly.newPlot('chart', data, layout);
};


const runQuery = () => {
  const query = document.getElementById("query").value;
  let result;

  clearLog();

  try {
    result = db.exec(query);
  } catch (err) {
    // Show SQL error in log
    log("SQL Error: " + err.message);
    return;
  }

  // name -> { years: [], counts: [] }
  const series = {};

  result[0]?.values?.forEach(item => {
    const name = item[1];   // name
    const year = item[3];   // year
    const count = item[4];  // count

    if (!series[name]) {
      series[name] = {
        years: [],
        counts: []
      };
    }

    series[name].years.push(year);
    series[name].counts.push(count);
  });

  makeChart(series);
};


document.getElementById("queryForm").addEventListener("submit", e => {
  e.preventDefault()
  runQuery()
})

document.getElementById("queryForm").addEventListener('keydown', function (e) {
  if (e.key === "Enter") {
    if (e.ctrlKey) {
      runQuery()
    }
  }
});

init();
