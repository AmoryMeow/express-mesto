const router = require('express').Router();
const getData = require('../utils/files');
const path = require('path');

router.get('/users', (req, res) => {

  fileUsers = path.join(__dirname, '..', 'data' , 'users.json');

  getData(fileUsers)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    })


})
router.get('/users/:id', (req,res) =>{
  res.send(`users ${req.params.id}`);
})

module.exports = router;