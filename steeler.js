var sio = require('socket.io-client');
var request = require('request');
var async = require('async');

var config = { ratio: 2000,
  urlAbuela: 'http://localhost:3005/abuela',
  urlCasa: 'http://localhost:3005/casa',
  socketHost: 'localhost',
  socketPort: '3004'
  };

exports.produce = function produce(cb) {
  "use strict";
  var sock = sio.connect(config.socketHost, {
    port: config.socketPort
  });

  sock.on('error', function (err) {
    console.log('SOCKETIO-ERROR:' + err);
    cb(err, null);
    sock.disconnect();
    sock = sio.connect(config.socketHost, {
      port: config.socketPort
    });
    sock.emit("¡Hola Don Jose!");

  });

  sock.on('¿Paso usted por mi casa?', function (data) {
    var reqOpt = {method: 'POST', url: config.urlCasa, body: data, json: true};
    request(reqOpt, function (err, d) {
      if (err) {
        console.log(err);
        sock.emit("¡Hola Don Jose!");
      } else {
        sock.emit('Por su casa yo pase', {certificate: d.body.certificate});
      }
    });
  });

  sock.on('¿Vio usted a mi abuela?', function (data) {
    var reqOpt = {method: 'POST', url: config.urlAbuela, body: data, json: true};
    request(reqOpt, function (err, d) {
      if (err) {
        console.log(err);
        sock.emit("¡Hola Don Jose!");
      } else {
        sock.emit('A su abuela yo la vi', {certificate: d.body.certificate});
      }
    });
  });

  sock.on('¡Adios Don Pepito!', function (data) {
    sock.emit('¡Adios Don Jose!');
    cb(null, {id: data.resource, name: data.resourceType});
    setTimeout(sock.emit.bind(this, "¡Hola Don Jose!"), config.ratio);
  });

  sock.on('¡Hola Don Pepito!', function () {
    sock.emit("¡Hola Don Jose!");
  });
};




