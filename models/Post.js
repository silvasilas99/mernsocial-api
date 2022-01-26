const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        desc: {
            type: String,
            max: 500, 
        },
        img: {
            type: String,
        },
        likes: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            default: [],
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);