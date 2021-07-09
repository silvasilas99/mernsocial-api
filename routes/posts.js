const router = require('express').Router();
const PostsController = require('./../controllers/PostsController');

router.get('/', PostsController.hello);

module.exports = router;