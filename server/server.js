// const express = require('express');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3000;
// const proxy = require('express-http-proxy');
// // const httpProxy = require('http-proxy');

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', proxy('http://localhost:3002/'));
// app.use('/', proxy('http://localhost:3003/'));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.listen(port, () => {
//   console.log(`server running at: http://localhost:${port}`);
// });


const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const apiProxy = httpProxy.createProxyServer();

const user = 'http://localhost:3001',
  related = 'http://localhost:3002',
  comment = 'http://localhost:3003',
  player = 'http://localhost:3004';


app.use(express.static(path.join(__dirname, 'public')));

app.all('/related/api/songs/:songid/related', (req, res) => {
  apiProxy.web(req, res, { target: related });
});

app.all('/related/api/songs/:songid/', (req, res) => {
  apiProxy.web(req, res, { target: related });
});


app.listen(port, () => console.log('Server listening on port ' + port));