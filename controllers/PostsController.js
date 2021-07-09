const Post = require('./../models/Post');

module.exports = {
    async hello (req, res) {
    	return res.status(200).json({ message: "Welcome, user" });
    }
};