/**
 * proximity-sensor.js
 * @author Thomas Kunnumpurath
 */

import produce from "immer";

import { Board, Proximity } from "johnny-five";
const PiIO = require("pi-io");

let sensor = null;

function ProximitySensor() {
  async function connectToBoard() {
    return new Promise((resolve, reject) => {
      let board = new Board({
        io: new PiIO()
      });

      board.on("ready", () => {
        sensor = new Proximity({
          controller: PiIO.HCSR04,
          triggerPin: "GPIO23",
          echoPin: "GPIO24"
        });

        resolve();
      });
    });
  }

  // adds proximity sensor handler for a given range
  function addProximityHandler(minRangeCm = 0, maxRangeCm, handler) {
    console.log(`Enabling range of proxmity dection to be [${minRangeCm},${maxRangeCm}]cms`);
    sensor.on("data", measurement => {
      if (measurement.cm > minRangeCm && measurement.cm < maxRangeCm) handler(measurement);
    });
  }

  //adds range detector handler for a given range
  function addRangeDetectorHandler(minRangeCm, maxRangeCm, handler) {
    sensor.within([minRangeCm, maxRangeCm], "cm", () => {
      handler;
    });
  }

  return produce({}, draft => {
    draft.connectToBoard = connectToBoard;
    draft.addProximityHandler = addProximityHandler;
    draft.addRangeDetectorHandler = addRangeDetectorHandler;
  });
}

export default ProximitySensor;
