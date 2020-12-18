const router = require('express').Router();
const path = require('path');
const getData = require('../utils/files');

const {getUser, getUserById, createUser, updateUser, updateAvatar} = require('../controllers/users');

const fileUsers = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', getUser);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
