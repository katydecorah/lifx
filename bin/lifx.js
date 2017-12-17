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
  console.log('Usage:   lifx --bulb=<id/all> --click=<SINGLE|DOUBLE|LONG>');
  console.log('Example: lifx --bulb=all --click=SINGLE');
  process.exit(1);
}

process.env.LifxClickType = argv.click || 'DOUBLE';
process.env.LifxSingleBulb = argv.bulb || 'all';
process.env.LifxDoubleBulb = argv.bulb || 'all';
process.env.LifxLongBulb = argv.bulb || 'all';

bot.handler({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
