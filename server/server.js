const express = require('express');
const app = express();
const httpProxy = require('http-proxy');
const port = 3000;



const apiProxy = httpProxy.createProxyServer();
const serverOne = 'http://ec2-54-183-128-92.us-west-1.compute.amazonaws.com/';  
const serverTwo = 'http://ec2-54-215-217-201.us-west-1.compute.amazonaws.com/';  
const serverThree = 'http://ec2-54-185-4-172.us-west-2.compute.amazonaws.com/'; 
const serverFour = 'http://ec2-18-222-200-123.us-east-2.compute.amazonaws.com/'

app.use('/songs/:songId', express.static('./public'));
app.use('/', express.static('./public'));

app.all("/player/*", function (req, res) {
  apiProxy.web(req, res, { target: serverFour });
});

app.all("/user/*", function (req, res) {
  apiProxy.web(req, res, { target: serverOne });
});

app.all("/comments/*", function (req, res) {
  apiProxy.web(req, res, { target: serverThree });
});

app.all("/related/*", function (req, res) {
  apiProxy.web(req, res, { target: serverTwo });
});


app.listen(port, () => console.log('Server listening on port ' + port));