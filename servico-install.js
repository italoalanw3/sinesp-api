//npm install -g node-windows
//npm link node-windows
var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'RastrusSinespServerNodeJS',
  description: 'Servico para buscar placa de veiculo para o Rastrus.',
  script: require('path').join(__dirname, 'index.js')
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();