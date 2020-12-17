const CardSchema = require('../models/card');

const getCards = (req,res) => {
  CardSchema.find({})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({message: 'Ошибка сервера'}))
}

const createCard = (req,res) => {

  const {name, link} = req.body;
  const owner = req.user._id;

  CardSchema.create({name, link, owner})
    .then(card => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError')  {
        res.status(400).send({message: 'Переданы некорректные данные'})
      } else {
        res.status(500).send({message: err.message})
      }
    });
}

const deleteCardById = (req,res) => {
  const {id} = req.params;
  console.log(id)
  CardSchema.findByIdAndRemove(id)
    .orFail(() => {
      const error = new Error('Данные не найдены');
      error.statusCode = 404;
      console.log('error: ', error);
      throw error;
    })
    .then(card => res.status(200).send(card))
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

module.exports = {getCards, createCard, deleteCardById}