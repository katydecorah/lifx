const utils = require('./utils.js');

const handler = (event, context, callback) => {
  const clickType = utils.parseEvent(event);
  if (clickType) {
    const clickResponse = utils.getClickResponse(clickType);
    module.exports.setIt(clickResponse, null, callback);
  } else {
    return callback(null, 'No action');
  }
};

const toggleIt = (event, context, callback) => {
  utils.toggle().then(res => callback(null, res));
};

const setIt = (event, context, callback) => {
  utils
    .setState(event.bulb || process.env.LifxBulb, event.set)
    .then(res => callback(null, res));
};

const getIt = (event, context, callback) => {
  utils.getState().then(res => callback(null, res));
};

module.exports = {
  handler,
  toggleIt,
  getIt,
  setIt
};
