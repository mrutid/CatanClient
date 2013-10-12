//make workers produce and stores en wharehouse

var wharehouse = require('./wharehouse.js'),
  workerList = ['./chopper', './steeler'],
  workerPool;

var gotMaterial = function (error, material) {
  "use strict";
  if (!error && material.id) {
    wharehouse.add(material, function (err) {
      if (!err) {
        console.log('Material ' + material.name + ' kept into wharehouse');
      } else {
        console.log('error Keeping' + material.name);
      }
    });
  } else {
    console.log("ERR:" + error + "DAT:" + material);
  }
};

//create workers
workerPool = workerList.map(function (worker) {
  'use strict';
  return require(worker);
});
//make them work
workerPool.forEach(function (worker) {
  'use strict';
  worker.produce(gotMaterial);
});