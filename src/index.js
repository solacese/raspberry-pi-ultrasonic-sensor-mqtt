/**
 * index.js
 *
 */

// polyfill async
import "core-js";
import "regenerator-runtime";
// load env variables
import dotenv from "dotenv";

let result = dotenv.config();
if (result.error) {
  throw result.error;
}
import MqttClient from "./mqtt-client";
import ProximitySensor from "./proximity-sensor";

async function run() {
  // initialize and connect mqtt client
  let mqttClientConfig = {
    hostUrl: process.env.SOLACE_MQTT_HOST_URL,
    username: process.env.SOLACE_USERNAME,
    password: process.env.SOLACE_PASSWORD,
    clientId: process.env.MQTT_CLIENT_ID
  };

  console.log("=== Starting MQTT producer ===");

  let mqttClient;

  try {
    mqttClient = MqttClient(mqttClientConfig);
    console.log("Connecting MQTT client to Solace...");
    await mqttClient.connect();
    console.log("MQTT client connected to Solace.");
  } catch (err) {
    console.error(err);
    process.exit();
  }

  let proximitySensor;

  try {
    proximitySensor = new ProximitySensor(process.env.SAMPLING_INTERVAL_MS);
    console.log("Connecting to board...");
    await proximitySensor.connectToBoard();
    console.log("Connected to the board!");
  } catch (err) {
    console.error(err);
    process.exit();
  }

  proximitySensor.addProximityHandler(process.env.MIN_RANGE_CM, process.env.MAX_RANGE_CM, measurement => {
    let measurementJson = JSON.stringify(measurement);
    console.log(`Distance measurement: ${measurementJson}`);
    mqttClient.send("SOLACE/DISTANCE/MEASUREMENT", measurementJson);
  });
}

run();
