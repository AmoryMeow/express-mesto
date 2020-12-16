const CardSchema = require('../models/card');

const getCards = (req,res) => {
  CardSchema.find({})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({message: 'Ошибка получения данных'}))
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

  CardSchema.findOneAndRemove(id)
    .orFail(() => {
      res.status(404).send({message: 'Данные не найдены'});
    })
    .then(card => res.status(200).send(card))
    .catch(err => res.status(500).send({message: err.message}))
}

module.exports = {getCards, createCard, deleteCardById}