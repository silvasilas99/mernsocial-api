const User = require('./../models/User');
const bcrypt = require("bcrypt");

module.exports = {
    async updateUser (req, res) {
		if (req.body.userId == req.params.id || req.body.isAdmin) {	
			if(req.body.password) {
				try {
					const salt = await bcrypt.genSalt(10);
					req.body.password = await bcrypt.hash(req.body.password, salt);
				} catch (err) {
		            return res.status(500).json(err.message);
		        }	
			}

			try {
				const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body  });
				res.status(200).json({ message: "Your account has been updated successfully!"});
			} catch (err) {
	            return res.status(500).json(err.message);
	        }
		} else {
			return res.status(403).json({ message: "You can modify only your account!" });
		}
    },

    async deleteUser (req, res) {
    	if (req.body.userId === req.params.id || req.body.isAdmin) {
		    try {
			    await User.findByIdAndDelete(req.params.id);
			    res.status(200).json({ message: "Your account has been deleted successfully!"});
		    } catch (err) {
		      	return res.status(500).json(err.message);
		    }
		} else {
			return res.status(403).json("You can delete only your account!");
		}
    },

    async getUser (req, res) {
    	try {
		    const user = await User.findById(req.params.id);
		    const { password, updatedAt, ...other } = user._doc;
		    res.status(200).json({ content: other});
		} catch (err) {
		    return res.status(500).json(err.message);
		}
    },

	async follow (req, res) {
		 if (req.body.userId !== req.params.id) {
		    try {
		      	const user = await User.findById(req.params.id);
		      	const currentUser = await User.findById(req.body.userId);
		      	if (!user.followers.includes(req.body.userId)) {
		       		await user.updateOne({ $push: { followers: req.body.userId } });
		        	await currentUser.updateOne({ $push: { following: req.params.id } });
		        	return res.status(200).json({ message: "Now you are following this user" });
		      	} else {
		        	return res.status(403).json({ message: "You already following this user" });
		      	}
		    } catch (err) {
		      	res.status(500).json(err);
		    }
		} else {
		    return res.status(403).json({ message: "You can not follow yourself" });
		}
    },

};