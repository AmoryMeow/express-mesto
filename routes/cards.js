const router = require('express').Router();
const path = require('path');
const getData = require('../utils/files');

const fileUsers = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  getData(fileUsers)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
