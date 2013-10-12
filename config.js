exports.designUrl = 'http://localhost:3001/design';
exports.houseUrl = 'http://localhost:3001/house';
exports.login = "mru";
exports.workerList = ['./chopper', './steeler'];
exports.resources = ['Madera', 'Piedra', 'Metal', 'Cemento'];

exports.steeler = { ratio: 2000,
  urlAbuela: 'http://localhost:3005/abuela',
  urlCasa: 'http://localhost:3005/casa',
  socketHost: 'localhost',
  socketPort: '3004'
  };

exports.chopperConfig = {
  ratio: 2000,
  url: "http://localhost:3003/chop"
};