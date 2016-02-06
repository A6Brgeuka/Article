var mongoose = require('libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title:{
        type: String,
        unique: true,
        required: true
    },
    body:{
        type: String
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created:{
        type: Date,
        default: Date.now
    }
});

modele.exports = mongoose.model('Article', schema);
