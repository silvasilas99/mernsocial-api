const Post = require('./../models/Post');
const User = require('./../models/User');

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


    async like (req, res) {
    	try {
    		const post = await Post.findById(req.params.id);
    		if (!post.likes.includes(req.body.userId)) {
      			await post.updateOne({ $push: { likes: req.body.userId } });
      			res.status(200).json({ message: "You have liked this post" });
   			} else {
      			await post.updateOne({ $pull: { likes: req.body.userId } });
      			res.status(200).json({ message: "You have unliked this post" });
    		}
  		} catch (err) {
    		return res.status(500).json(err.message);
  		}
    },

    async timeline (req, res) {
    	try {
    		const currentUser = await User.findById(req.body.userId);
    		const userPosts = await Post.find({ userId: currentUser._id });
    		const friendPosts = await Promise.all(
      			currentUser.following.map((friendId) => {
        		return Post.find({ userId: friendId });
      		})
    	);
    res.json(userPosts.concat(...friendPosts))
    		res.json(userPosts.concat(...friendPosts));
    	} catch (err) {
    		return res.status(500).json(err.message);
  		}
    }
};