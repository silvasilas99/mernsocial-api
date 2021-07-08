const User = require('./../models/User');
const bcrypt = require("bcrypt");

module.exports = {
    async registerUser (req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
            const newUser = new User ({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            const user = await newUser.save();
            res.status(200).json ({ message: "User created successfully!" });
        } catch (err) {
            res.status(500).json(err.message)
        }
    },
    async loginUser (req, res) {
        try {
            const user = await User.findOne ({ email: req.body.email });
            if (!user) res.status(404).json("This user does not exist");
        
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) res.status(400).json("Incorrect password! Try again");
        
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
};