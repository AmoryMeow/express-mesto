const UserSchema = require('../models/user');

getUser = (req,res) => {
  UserSchema.find({})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({message: 'Ошибка получения данных'}))
}

getUserById = (req,res) => {
  const {id} = req.params;
  UserSchema.findById(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({message: 'Пользователь не найден'}))
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