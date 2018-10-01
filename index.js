const utils = require('./utils.js');

module.exports.handler = (event, context, callback) => {
  const clickType = utils.parseEvent(event);
  if (clickType) {
    const clickResponse = utils.getClickResponse(clickType);
    module.exports.setIt(clickResponse, null, callback);
  } else {
    return callback(null, 'No action');
  }
};

module.exports.toggleIt = (event, context, callback) => {
  utils.toggle().then(res => callback(null, res));
};

module.exports.setIt = (event, context, callback) => {
  utils
    .setState(event.bulb || process.env.LifxBulb, event.set)
    .then(res => callback(null, res));
};

module.exports.getIt = (event, context, callback) => {
  utils.getState().then(res => callback(null, res));
};
