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


// const express = require('express');
// const proxy = require('express-http-proxy');
// const path = require('path');
// const httpProxy = require('http-proxy');
// const parser = require('body-parser');
// const cors = require('cors');
// const app = express();
// const port = process.env.PORT || 3000;

// app.get("/", function(req, res) {
//   res.redirect("/related");
// })
//glory - '/user/songs/:songid'
// app.get("/", function (req, res) {
//   res.redirect("/user/");
// })
// app.use('/songs/:songId', proxy('http://localhost:3001/'));
// app.use('/', proxy('http://localhost:3001/'));
// app.use('/', proxy('http://localhost:3002'));
// app.use('/related/songs/:songid/related',
//   proxy({ target: "http://localhost:3002", changeOrigin: true })
// );
// app.use('/', proxy('http://localhost:3003/song/:id'));
// app.use('/', proxy('http://localhost:3004/player/sc'));

// const apiProxy = httpProxy.createProxyServer();

// const user = 'http://localhost:3001',
//   related = 'http://localhost:3002',
//   comment = 'http://localhost:3003',
//   player = 'http://localhost:3004';
// app.use(cors());

// app.set("port", port);

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express());
// app.use(parser.json());

// app.get("/", function(req, res) {
//   res.redirect("/");
// })

// app.use(
//   '/related', 
//   proxy({ target: 'http://localhost:3002/', changeOrigin: true})
// );

// app.use(
//   '/songs/:songId',
//   proxy({ target: 'http://localhost:3001/', changeOrigin: true })
// );

// app.get('/', function(req, res) {
//   const songPath = path.join(__dirname, "public");
//   res.sendFile(songPath);
// })
// app.use('/', proxy('http://localhost:3004/'));
// app.use('/songs/:songId', proxy('http://localhost:3001/songs/:songId'));
// app.use('/', proxy('http://localhost:3004/player/sc'));
// app.all('/', (req, res) => {
//   apiProxy.web(req, res, { target: related });
// });

// app.all('/api/songs/:songid/', (req, res) => {
//   apiProxy.web(req, res, { target: related });
// });


const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const port = 3000;


const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://localhost:3001';  
const serverThree = 'http://localhost:3002'; 
const serverTwo = 'http://localhost:3003';  
const serverFour = 'http://localhost:3004'

app.use('/songs/:songId', express.static('./public'));
//any request with user --> glory server
app.all("/user/*", function (req, res) {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, { target: serverOne });
});

app.all("/comments/*", function (req, res) {
  console.log('redirecting to Server2');
  apiProxy.web(req, res, { target: serverTwo });
});

app.all("/related/*", function (req, res) {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, { target: serverThree });
});

app.all("/player/*", function (req, res) {
  console.log('redirecting to Server4');
  apiProxy.web(req, res, { target: serverFour });
});

app.listen(port, () => console.log('Server listening on port ' + port));