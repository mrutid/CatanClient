//make workers produce and stores en wharehouse

var warehouse = require('./warehouse.js'),
  config = require('./config'),
  workerList = config.workerList;

var gotMaterial = function (error, material) {
  "use strict";
  if (!error && material.id) {
    warehouse.add(material, function (err) {
      if (!err) {
        console.log('Material ' + material.name + ' kept into warehouse');
      } else {
        console.log('error Keeping' + material.name);
      }
    });
  } else {
    console.log("ERR:" + error + "DAT:" + material);
  }
};

//create workers & make them work
workerList.forEach(function (worker) {
  'use strict';
  require(worker).produce(gotMaterial);
});
