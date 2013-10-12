var specialistFactory = require('./specialist'),
  async = require('async'),
  request = require('request'),
  config = require('./config'),
  designUrl = config.designUrl,
  houseUrl = config.houseUrl,
  login = config.login;

function createSpecialist(designList) {
  "use strict";
  return designList.map(function (elem) {
    return specialistFactory.create(elem);
  });
}

function buildHouse(house, cb) {
  "use strict";
  var reqOpt = {
    method: 'POST',
    url: houseUrl,
    body: house,
    json: true
  };
  request(reqOpt, function (error, houseData) {
    if (error) {
      console.log(error);
    }
    cb(error, houseData.body);
  });
}

function buildDesigns(err, designs) {
  "use strict";
  if (!err) {
    var specialistList = createSpecialist(JSON.parse(designs.body));

    specialistList.forEach(function (specialist) {
      //launch forever every specialist
      function forForever(cb) {
        specialist.build(function (err, material) {
          if (err) {
            cb(err);
          } else {
            //build a house with these resources
            var house = {
                "resources": material.map(function (e) {return e[1]; }),
                "designId": specialist.id,
                "login": login
              };
            buildHouse(house, function (error, houseData) {
              if (!error) {
                console.log("HOUSE built: " + specialist.type +
                  "  value= " + specialist.value);
                console.dir(houseData.designId);
              }
              cb(error, houseData);
            });
          }
        });
      }

      async.forever(forForever, function (err) {
        console.dir(err);
      });

    });
  } else {
    console.dir(err);
  }
}

request({url: designUrl, JSON: true}, buildDesigns);

