const mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    postSchema = new Schema({
        image: {
            type: String,
            require:true,
        },
        description: {
            type: String,
            require:true,
        },
        createdAt: {
            type: Date,
            default: Date().now(),
        },
    });

    module.exports = mongoose.model('Post', postSchema);