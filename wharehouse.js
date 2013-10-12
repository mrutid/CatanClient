var redis = require('redis'),
  con = redis.createClient(),
  pool = {},
  recursos = ['Madera', 'Piedra', 'Metal', 'Cemento'];

recursos.forEach(function (material) {
  "use strict";
  pool[material] = redis.createClient();
});
exports.pool = pool;

exports.add = function (resource, cb) {
  "use strict";
  con.lpush(resource.name, resource.id, cb);
};

exports.waitForMaterial = function (material) {
  "use strict";
  return pool[material].brpop.bind(pool[material], material, 0);
};