var request = require("request"),
  config = require('./config'),
  chopperConfig = config.chopperConfig;

var chop = function (cb) {
  "use strict";

  var options = {
    url: chopperConfig.url,
    json: true
  };

  request.get(options, function (error, responseData) {
    if (error && cb) {
      cb(error, null);
    } else {
      if (cb) {
        if (responseData.body.id) {
          cb(null, responseData.body);
        }
      }
    }
  });
};

exports.produce = function (cb) {
  "use strict";
  setInterval(chop.bind(this, cb), chopperConfig.ratio);
};