#!/usr/bin/env node

const bot = require('../index.js');
const argv = require('minimist')(process.argv.slice(2));

if (!process.env.LifxAccessToken) {
  console.log(
    'LifxAccessToken must be set as an environment variable, see README for details.'
  );
  process.exit(1);
}

if (!argv.bulb) {
  console.log(
    'Usage:   lifx-set --bulb=<bulb ID|all> --color=<string> --power=<on|off> --brightness=<number> --duration=<number>'
  );
  console.log(
    'Example: lifx-set --bulb=100010000001 --color=red --power=on --duration=1'
  );
  process.exit(1);
}

const params = {
  bulb: argv.bulb,
  set: {}
};
if (argv.color) params.set.color = argv.color;
if (argv.power) params.set.power = argv.power;
if (argv.brightness) params.set.brightness = argv.brightness;
if (argv.duration) params.set.duration = argv.duration;

bot.setIt(params, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
