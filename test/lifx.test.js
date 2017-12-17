const test = require('tape');
const utils = require('../utils.js');
const settings = require('../iot-settings.json');

test('[handler] SINGLE', assert => {
  const fixture = {
    Records: [
      {
        EventSource: 'aws:sns',
        Sns: {
          Type: 'Notification',
          Message: JSON.stringify({
            batteryVoltage: '1549mV',
            clickType: 'SINGLE'
          })
        }
      }
    ]
  };
  const settingsFixture = settings['SINGLE'];
  settingsFixture.bulb = 'all';
  process.env.LifxSINGLEBulb = 'all';
  const clickType = utils.parseEvent(fixture);
  const clickResponse = utils.getClickResponse(clickType);
  assert.equal(clickType, 'SINGLE');
  assert.deepEqual(clickResponse, settingsFixture);
  assert.end();
});

test('[handler] DOUBLE', assert => {
  const fixture = {
    Records: [
      {
        EventSource: 'aws:sns',
        Sns: {
          Type: 'Notification',
          Message: JSON.stringify({
            batteryVoltage: '1549mV',
            clickType: 'DOUBLE'
          })
        }
      }
    ]
  };
  const settingsFixture = settings['DOUBLE'];
  settingsFixture.bulb = 'all';
  process.env.LifxDoubleBulb = 'all';
  const clickType = utils.parseEvent(fixture);
  const clickResponse = utils.getClickResponse(clickType);
  assert.equal(clickType, 'DOUBLE');
  assert.deepEqual(clickResponse, settingsFixture);
  assert.end();
});

test('[handler] LONG', assert => {
  const fixture = {
    Records: [
      {
        EventSource: 'aws:sns',
        Sns: {
          Type: 'Notification',
          Message: JSON.stringify({
            batteryVoltage: '1549mV',
            clickType: 'LONG'
          })
        }
      }
    ]
  };
  const settingsFixture = settings['LONG'];
  settingsFixture.bulb = 'all';
  process.env.LifxLONGBulb = 'all';
  const clickType = utils.parseEvent(fixture);
  const clickResponse = utils.getClickResponse(clickType);
  assert.equal(clickType, 'LONG');
  assert.deepEqual(clickResponse, settingsFixture);
  assert.end();
});
