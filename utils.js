const request = require('request');

module.exports.toggle = () => {
  const opts = {
    url: `https://api.lifx.com/v1/lights/${process.env.LifxBulb}/toggle`,
    headers: {
      Authorization: `Bearer ${process.env.LifxAccessToken}`
    }
  };

  return new Promise((resolve, reject) => {
    request.post(opts, (err, res, body) => {
      if (err) reject(err);
      if (!body.length) reject();
      resolve(body);
    });
  });
};

module.exports.getState = () => {
  const opts = {
    url: `https://api.lifx.com/v1/lights/${process.env.LifxBulb}`,
    headers: {
      Authorization: `Bearer ${process.env.LifxAccessToken}`
    }
  };

  return new Promise((resolve, reject) => {
    request.get(opts, (err, res, body) => {
      if (err) reject(err);
      if (!body.length) reject();
      resolve(body);
    });
  });
};

module.exports.setState = (bulb, params) => {
  const opts = {
    url: `https://api.lifx.com/v1/lights/${bulb}/state`,
    form: params,
    headers: {
      Authorization: `Bearer ${process.env.LifxAccessToken}`
    }
  };

  return new Promise((resolve, reject) => {
    request.put(opts, (err, res, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
};

module.exports.parseEvent = event =>
  process.env.LifxClickType ||
  JSON.parse(event.Records[0].Sns.Message).clickType;

module.exports.getClickResponse = click => {
  const responses = require('./iot-settings.json');
  const bulbs = {
    SINGLE: process.env.LifxSingleBulb,
    DOUBLE: process.env.LifxDoubleBulb,
    LONG: process.env.LifxLongBulb
  };
  let response = responses[click];
  response.bulb = bulbs[click];
  return response;
};
