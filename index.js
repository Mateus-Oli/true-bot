// API + WebSocket
const app        = require('express')();
const expressWs  = require('express-ws')(app);
const bodyParser = require('body-parser');

// Configurações
const PORT = 8008;

// Servicos
const requestService = require('./service/request.service'); /* LOG Requests */
const loginService = require('./service/login.service'); /* Valida Logins */

// Controles de Aplicação
const appCtrl = [
  require('./controller/app/coupon.controller'),
  require('./controller/app/qrcode.controller')
];

// Controles de Login
const loginCtrl = [
  require('./controller/admin/login.controller')
];

// Controles de Administrador
const adminCtrl = [
  require('./controller/admin/request.controller'),
  require('./controller/admin/user.controller'),
  require('./controller/admin/coupon.controller'),
  require('./controller/admin/qrcode.controller')
];

// Leitura de JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*',(req, res, next) => {

  // Acrescenta Cabeçalhos necessarios
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token');

  // Armazena Request em Banco
  requestService.create(req);

  next();
});

// Valida Token de Conexão
app.all('/admin/*', (req, res, next) => {

  loginService.checkToken(req.headers.token)
    .then(next)
    .catch((err) => res.status(401).send(err));
});

// Rotas da Aplicação
appCtrl.forEach((ctrl) => app.use(ctrl));

// Rotas de Login
loginCtrl.forEach((ctrl) => app.use(ctrl));

// Rotas do Admin
adminCtrl.forEach((ctrl) => app.use('/admin', ctrl));

// Sobe Aplicação
app.listen(PORT, () => console.log(`listening on port ${PORT}`));