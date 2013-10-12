var specialistFactory = require('./specialist'),
  async = require('async'),
  request = require('request'),
  designUrl = 'http://localhost:3001/design',
  houseUrl = 'http://localhost:3001/house';

function createSpecialist(desingList) {
  "use strict";
  return desingList.map(function (elem) {
    return specialistFactory.create(elem);
  });
}

function buildHouse(reqOpt, cb) {
  "use strict";
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
            var resources = material.map(function (e) {
                return e[1]; //extract the resource [name, res]
              }),
              house = {
                "resources": resources,
                "designId": specialist.id,
                "login": "mru"
              },
              reqOpt = {
                method: 'POST',
                url: houseUrl,
                body: house,
                json: true
              };
            buildHouse(reqOpt, function (error, houseData) {
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

