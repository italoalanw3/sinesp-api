var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'RastrusSinespServerNodeJS',
  description: 'Servico para buscar placa de veiculo para o Rastrus.',
  script: 'D:\\Repositorios\\Outros\\sinesp\\sinesp-api-master\\index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();