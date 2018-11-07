require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/related/api/songs/:songid/related', (req, res) => {
  db.getRelated((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(Object.assign({}, results));
    }
  });
});

app.get('/related/api/songs/:songid/', (req, res) => {
  const song = req.params.songid;
  db.getSong(song, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(Object.assign({}, results));
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
