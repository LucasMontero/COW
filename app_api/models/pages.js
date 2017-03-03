//required
var mongoose = require('mongoose');

//MongoDB pages schema

var pageSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    path: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String
    },
    footer: {
        type: Boolean
    },
    header: {
        type: Boolean
    },
    index: {
        type: Boolean
    },
    public: {
        type: Boolean
    }
});

mongoose.model('Page', pageSchema);
