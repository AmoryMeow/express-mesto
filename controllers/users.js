const UserSchema = require('../models/user');

getUser = (req,res) => {
  UserSchema.find({})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({message: 'Ошибка сервера'}))
}

getUserById = (req,res) => {
  const {id} = req.params;
  UserSchema.findById(id)
    .orFail(() => {
      const error = new Error('Данные не найдены');
      error.statusCode = 404;
      throw error;
    })
    .then(data => res.status(200).send(data))
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

updateUser = (req,res) => {
  const id = req.user._id;
  const {name, about} = req.body;
  UserSchema.findByIdAndUpdate(id, {name,about}, {new: true})
    .orFail(() => {
      const error = new Error('Данные не найдены');
      error.statusCode = 404;
      throw error;
    })
    .then(data => res.status(200).send(data))
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

updateAvatar = (req,res) => {
  const id = req.user._id;
  const {avatar} = req.body;
  UserSchema.findByIdAndUpdate(id, {avatar}, {new: true})
    .orFail(() => {
      const error = new Error('Данные не найдены');
      error.statusCode = 404;
      throw error;
    })
    .then(data => res.status(200).send(data))
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

module.exports = {getUser,
                  getUserById,
                  createUser,
                  updateUser,
                  updateAvatar};