/**
 * index.js
 *
 */

// polyfill async
import "core-js";
import "regenerator-runtime";
import { Board, Proximity } from "johnny-five";
const PiIO = require("pi-io");

async function run() {
  // initialize and connect mqtt client
  let board = new Board({
    io: new PiIO()
  });

  let sensor = null;

  board.on("ready", () => {
    sensor = new Proximity({
      controller: PiIO.HCSR04,
      triggerPin: "GPIO23",
      echoPin: "GPIO24"
    });
  });

  sensor.on("data", measurement => {
    console.log(`Sensor measurement: ${JSON.stringify(measurement)}`);
  });
}

run();
