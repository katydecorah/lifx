const request = require('request');

const toggle = () => {
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

const getState = () => {
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

const setState = (bulb, params) => {
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

const parseEvent = event => {
  return (
    process.env.LifxClickType ||
    JSON.parse(event.Records[0].Sns.Message).clickType
  );
};

const getClickResponse = click => {
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

module.exports = {
  toggle,
  getState,
  setState,
  parseEvent,
  getClickResponse
};
