var sio = require('socket.io-client'),
  request = require('request'),
  config = require('./config'),
  steelerConfig = config.steeler;

exports.produce = function produce(cb) {
  "use strict";
  var sock = sio.connect(steelerConfig.socketHost, {
    port: steelerConfig.socketPort
  });

  sock.on('Error', function (err) {
    console.log('SOCKETIO-ERROR:' + err);
    cb(err, null);
    sock.disconnect();
    sock = sio.connect(steelerConfig.socketHost, {
      port: steelerConfig.socketPort
    });
    sock.emit("¡Hola Don Jose!");
  });

  sock.on('¿Paso usted por mi casa?', function (data) {
    var reqOpt = {method: 'POST', url: steelerConfig.urlCasa, body: data, json: true};
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
    var reqOpt = {method: 'POST', url: steelerConfig.urlAbuela, body: data, json: true};
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
    setTimeout(sock.emit.bind(this, "¡Hola Don Jose!"), steelerConfig.ratio);
    if (data && data.resource) {
      cb(null, {id: data.resource, name: data.resourceType});
    } else {
      cb(data, null);
    }
  });

  sock.on('¡Hola Don Pepito!', function () {
    sock.emit("¡Hola Don Jose!");
  });
};
