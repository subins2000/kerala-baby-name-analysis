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

  const layout = {
    title: 'Babies per born year',
    xaxis: {
      title: 'Year',
      tickmode: 'linear',
      tickangle: -45
    },
    yaxis: {
      title: 'Birth count'
    }
  };

  Plotly.newPlot('chart', data, layout);
};


const runQuery = () => {
  const query = document.getElementById("query").value;
  const result = db.exec(query);

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
