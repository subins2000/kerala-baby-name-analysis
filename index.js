import { race } from "racing-bars";

race("/analysis.json", "#race", {
  dateCounter: "YYYY",
  tickDuration: 2000,
  topN: 10,
  height: 600
});
