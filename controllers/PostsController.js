const Post = require('./../models/Post');

module.exports = {
    async createPost (req, res) {
    	const newPost = new Post(req.body);
	  	try {
	    	const savedPost = await newPost.save();
	    	res.status(200).json(savedPost);
	  	} catch (err) {
	    	return res.status(500).json(err.message);
	  	}
    },

    async deletePost (req, res) {
    	try {
    		const post = await Post.findById(req.params.id);
    		if (post.userId === req.body.userId) {
      			await post.deleteOne();
      			res.status(200).json({ message: "Post deleted successfully" });
    		} else {
      			res.status(403).json({ message: "You can delete only a post that you created" });
    		}
  		} catch (err) {
    		return res.status(500).json(err.message);
  		}
    },

    async updatePost (req, res) {
  		try {
    		const post = await Post.findById(req.params.id);
    		if (post.userId === req.body.userId) {
      			await post.updateOne({ $set: req.body });
      			res.status(200).json({ message: "Post updated successfully" });
    		} else {
      			res.status(403).json({ message: "You can update only a post that you created" });
    		}
  		} catch (err) {
    		return res.status(500).json(err.message);
  		}
    },

    async getSinglePost (req, res) {
    	try {
    		const post = await Post.findById(req.params.id);
    		res.status(200).json(post);
  		} catch (err) {
    		return res.status(500).json(err.message);
  		}
    },
};