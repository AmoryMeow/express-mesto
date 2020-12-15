const router = require('express').Router();
const path = require('path');
const getData = require('../utils/files');

const {getCards, createCard, deleteCardById} = require('../controllers/cards');

const fileUsers = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', getCards);
router.post('/cards', createCard);

module.exports = router;
