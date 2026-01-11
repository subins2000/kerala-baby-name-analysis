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

const makeChart = (years, counts) => {
  const data = [{
    x: years,
    y: counts,
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Count'
  }];

  const layout = {
    title: 'Year vs Birth count',
    xaxis: {
      title: 'Year',
      tickmode: 'linear',
      tickangle: -45
    },
    yaxis: {
      title: 'Birth count'
    },
    shapes: [
      {
        type: 'line',
        x0: 1993,
        x1: 1993,
        y0: 0,
        y1: Math.max(...counts),
        line: {
          width: 2,
          dash: 'dot'
        }
      },
      {
        type: 'line',
        x0: 1997,
        x1: 1997,
        y0: 0,
        y1: Math.max(...counts),
        line: {
          width: 2,
          dash: 'dot'
        }
      }
    ],
    annotations: [
      {
        x: 1993,
        y: Math.max(...counts),
        text: 'Aishwarya Rai comes to fame',
        showarrow: true,
        arrowhead: 2,
        ax: -40,
        ay: -40
      },
      {
        x: 1997,
        y: Math.max(...counts),
        text: "Aishwarya Rai - Mohanlal movie Iruvar released",
        showarrow: true,
        arrowhead: 2,
        ax: 60,
        ay: -20
      }
    ]
  };

  Plotly.newPlot('chart', data, layout);
}

const runQuery = () => {
  const query = document.getElementById("query").value;

  const result = db.exec(query)
  const yearAndCount = {}
  result[0]?.values?.forEach(item => {
    console.log(item)
    yearAndCount[item[3]] = item[4]
  })

  makeChart(Object.keys(yearAndCount), Object.values(yearAndCount))
}

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
