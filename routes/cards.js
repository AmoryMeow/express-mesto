const router = require('express').Router();
const path = require('path');
const getData = require('../utils/files');

const {getCards, createCard, deleteCardById, likeCard, dislikeCard} = require('../controllers/cards');

const fileUsers = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
