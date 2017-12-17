LIFX + AWS IoT Button [![Build Status](https://travis-ci.com/katydecorah/lifx.svg?token=TZtB5nKVkXgMi2Yv8Ay6&branch=master)](https://travis-ci.com/katydecorah/lifx)
---------------------

Control your LIFX bulbs from the command line or AWS Iot Button.

## Set up

1. Set your [LIFX Access token](https://cloud.lifx.com/settings) as an environment variable: `echo "export LifxAccessToken=0000ffff0000ffff0000ffff0000ffff0000ffff" >> ~/.bash_profile`
2. Run `npm install`
3. Run `npm link`

## Commands

:bulb: You can find the ID (also known as a [selector](https://api.developer.lifx.com/docs/selectors)) for a specific bulb using the LIFX [List Lights](https://api.developer.lifx.com/docs/list-lights) API. You can also use the [lifx-get](#get-lights) function in this repo.

### Toggle light(s)

Toggles the light(s) power.

```
lifx-toggle --bulb=<bulb ID|all>
```

Example:

```
lifx-toggle --bulb=100010000001
```

This function invokes the `toggleIt` function in `index.js`.

### Set light(s)

Sets the light(s) parameters to change it's current state.

```
lifx-set --bulb=<bulb ID|all> --color=<string> --power=<on|off> --brightness=<number> --duration=<number>
```

Example:

```
lifx-set --bulb=100010000001 --color=red --power=on --duration=1
```

This function invokes the `setIt` function in `index.js`.

### Get light(s)

Gets the current states of the lights(s).

```
lifx-get --bulb=<bulb ID|all>
```

Example:

```
lifx-toggle --bulb=100010000001
```

This function invokes the `getIt` function in `index.js`.

## AWS IoT

```
lifx --bulb=<bulb ID|all> --click=<SINGLE|DOUBLE|LONG>
```

This function invokes the `handler` function in `index.js`. You can edit this function to decide which functions are triggered by different clicks of your IoT button or change the settings in `iot-settings.json`.

### Deploy the code to AWS

1. **Create a CloudFormation template** - Follow the [AWS IoT Button AWS CloudFormation Quickstart](http://docs.aws.amazon.com/iot/latest/developerguide/iot-button-cloudformation.html) developer guide to create a CloudFormation template. Add an additional role and function to trigger the `handler` function in `index.js` (see [lifx.template.json](https://github.com/katydecorah/lifx/blob/master/cloudformation/lifx.template.json) for an example).
2. **S3** - Compress this folder and upload it to S3 in the directory specified in your CloudFormation template.
3. **CloudFormation** - Create a new stack, upload your template, and enter all environment variables.
4. **Click your button** - Click your AWS IoT button to see your lights change. From Lambda in the AWS Console, you can access logs to check for any errors.
