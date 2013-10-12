var redis = require('redis'),
  con = redis.createClient(),
  pool = {},
  recursos = ['Madera', 'Piedra', 'Metal', 'Cemento'];

con.on('error', console.log);

recursos.forEach(function (material) {
  "use strict";
  pool[material] = redis.createClient();
  pool[material].on('error', console.log);
});

exports.add = function (resource, cb) {
  "use strict";
  con.lpush(resource.name, resource.id, cb);
};

exports.waitForMaterial = function (material) {
  "use strict";
  return pool[material].brpop.bind(pool[material], material, 0);
};