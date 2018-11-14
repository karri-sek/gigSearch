"use strict";

// ALEXA LAMBDA:  arn:aws:lambda:eu-west-1:393767856149:function:all-things-hair-dev
// GOOGLE LAMBDA: https://5lw8wscbbf.execute-api.us-east-1.amazonaws.com/dev

const { App } = require("jovo-framework");
const handlers = require("./handlers/standard-handlers");

const myIntentMap = {
  "AMAZON.YesIntent": "YesIntent",
  "AMAZON.NoIntent": "NoIntent",
  "AMAZON.NextIntent": "NextIntent",
  "AMAZON.PreviousIntent": "PreviousIntent",
  "AMAZON.RepeatIntent": "RepeatIntent",
  "AMAZON.HelpIntent": "HelpIntent",
  "AMAZON.CancelIntent": "CancelIntent"
};

const intentsToSkipUnhandled = ["MenuIntent", "END"];

// App config
const config = {
  intentMap: myIntentMap,
  // logging: true,
  intentsToSkipUnhandled
  // db: {
  //   type: 'dynamodb',
  //   tableName: process.env.DYNAMODB_TABLE_NAME
  // }
  // requestLogging: true,
  // responseLogging: true
};

const app = new App(config);

app.setHandler(handlers.call(app));

exports.handler = (event, context, callback) => {
  // Analytics.userId = "USERID GENERATED USING THE MCID LIBRARY";
  app.handleLambda(event, context, callback);
};

// exports.handler = function (event, context, callback) {
app.handleRequest(event, callback, handlers);
app.execute();
// };

module.exports.app = app;
