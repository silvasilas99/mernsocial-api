const router = require('express').Router();
const UserController = require('./../controllers/UserController');

router.put('/:id', UserController.updateUser);

module.exports = router;