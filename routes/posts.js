const router = require('express').Router();
const PostsController = require('./../controllers/PostsController');

router.post('/', PostsController.createPost);
router.delete('/:id', PostsController.deletePost);
router.put('/:id', PostsController.updatePost);
router.get('/:id', PostsController.getSinglePost);

module.exports = router;