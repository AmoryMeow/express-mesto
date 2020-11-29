const router = require('express').Router();
const path = require('path');
const getData = require('../utils/files');

const fileUsers = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  getData(fileUsers)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get('/users/:id', (req, res) => {
  getData(fileUsers)
    .then((data) => {
      const user = data.find((item) => item._id === req.params.id);
      if (user) {
        res.status(200).send(user);
        return;
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
