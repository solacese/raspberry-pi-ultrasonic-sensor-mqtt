# raspberry-pi-ultrasonic-sensor-mqtt

A demo app that integrates an HCSR04 proximity sensor on a Raspberry PI with an MQTT publisher

## Setup instructions

The following items will need to be purchased to assemble this kit:

- [Raspberry Pi 2,3 or 4](https://www.adafruit.com/index.php?main_page=category&cPath=105) and necessary accessories (SD Card, Powersource, Keyboard, Mouse etc)
- [HC-SR04 Sensor](https://smile.amazon.com/gp/product/B07RGB4W8V/ref=ppx_yo_dt_b_asin_title_o01_s00?ie=UTF8&psc=1)
- [400 Points Breadboard](https://smile.amazon.com/gp/product/B0819VF8T3/ref=ppx_yo_dt_b_asin_title_o08_s00?ie=UTF8&psc=1)
- [Female to Male Jumper wires](https://smile.amazon.com/gp/product/B077N7J6C4/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1)
- [Male to Male Jumper Wires](https://smile.amazon.com/gp/product/B005TZJ0AM/ref=ppx_yo_dt_b_asin_title_o02_s00?ie=UTF8&psc=1)
- [330 Ω Resistor](https://smile.amazon.com/gp/product/B07QH5PFG3/ref=ppx_yo_dt_b_asin_title_o08_s01?ie=UTF8&psc=1)
- [470 Ω Resistor](https://smile.amazon.com/gp/product/B07QG1V4BH/ref=ppx_yo_dt_b_asin_title_o08_s01?ie=UTF8&psc=1)
- [Install NodeJS](https://nodejs.org/en/) on your Raspberry PI
- [Solace Cloud Account](https://solace.com/cloud-learning/group_getting_started/ggs_signup.html) or access to a Solace PubSub+ Broker

## Assembly instructions

Use the following diagram to connect the sensor to the Raspberry PI ![Breadboard Diagram](https://raw.githubusercontent.com/fivdi/pi-io/master/doc/hc-sr04-two-pin.png)

(Note the diagram is based on a Raspberry Pi 2 - take note of the pin positions and map it to the Raspberry PI that you have purchased)

## Setting up the code

Clone the repo to your pi and install dependencies using the following commands:

```
git clone https://github.com/solacese/raspberry-pi-ultrasonic-sensor-mqtt.git
cd raspberry-pi-ultrasonic-sensor-mqtt
npm i
```

do the following:

- Rename .EDIT-ME.env to .env
- Fill in the Solace connectivity in the .env file with details from Solace Cloud Console's Connection tab ![Solace Cloud Details](https://raw.githubusercontent.com/solacese/solace-js-mqtt-postgres-blog/master/docs/mqtt-conn-details.png)
- Specify the range (in centimeters) that you would want to have an event be published onto Solace in the .env file as well

## Running the code

Use the following command to run the application,

`sudo npm run start`

If successful, you should see the following output:

```
=== Starting MQTT producer ===
Connecting MQTT client to Solace...
MQTT client connected to Solace.
Connecting to board...
1583858715516 Available Pi-IO
1583858715614 Connected Pi-IO
1583858715619 Repl Initialized
>> Connected to the board!
Enabling range of proxmity dection to be [10,50]cms
Distance measurement: {"cm":18.299,"centimeters":18.299,"in":7.14,"inches":7.14}
```

In addition, the distance will be published on the topic `SOLACE/DISTANCE/MEASUREMENT` for applications to subscribe to.
