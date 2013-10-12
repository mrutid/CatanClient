var wharehouseCustomerLine = require('./wharehouse'),
  async = require('async');

exports.create = function createBuilder(design) {
  "use strict";
  var waitAllMaterials,
    resourceList = design.resources;

  waitAllMaterials = resourceList.map(function (material) {
    return wharehouseCustomerLine.waitForMaterial(material);
  });
  //returns a function able to build a design-resourceList
  return {
    build: async.parallel.bind(async, waitAllMaterials),
    type: design.type,
    value: design.value,
    id: design.id
  };
};

