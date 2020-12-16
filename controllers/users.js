const UserSchema = require('../models/user');

getUser = (req,res) => {
  UserSchema.find({})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({message: 'Ошибка получения данных'}))
}

getUserById = (req,res) => {
  const {id} = req.params;
  UserSchema.findById(id)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.statusCode = 404;
      throw error;
    })
    .then(data => res.status(200).send(data))
    //.catch(err => res.status(500).send({message: err}))
    // .catch((err) => {
    //   if (err.kind === 'ObjectId') {
    //     res.status(400).send({message: 'Ошибка получения данных'});
    //   } else {if (err.statusCode === 404) {
    //     res.status(404).send({message: err.message})
    //   } else {
    //     res.status(500).send('Ошибка сервера');
    //   }
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        res.status(400).send({message: 'Ошибка получения данных'});
      } else if (err.statusCode === 404) {
        res.status(404).send({message: err.message})
      } else {
        res.status(500).send({message: 'Ошибка сервера'});
      }
    })
}

createUser = (req,res) => {
  const {name, about, avatar} = req.body;
  UserSchema.create({name, about, avatar})
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send({message: 'Не удалось создать пользователя'}));
}

module.exports = {getUser,
                  getUserById,
                  createUser};