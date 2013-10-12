var request = require("request");
//IT will chop when "produce" es called
var config = {
  ratio: 2000,
  url: "http://localhost:3003/chop"
};

var chop = function (cb) {
  "use strict";

  var options = {
    url: config.url,
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
  setInterval(chop.bind(this, cb), config.ratio);
};