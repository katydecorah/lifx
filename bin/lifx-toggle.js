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
  console.log('Usage:   lifx-toggle --bulb=<id/all>');
  console.log('Example: lifx-toggle --bulb=all');
  process.exit(1);
}

process.env.LifxBulb = argv.bulb;

bot.toggleIt({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
