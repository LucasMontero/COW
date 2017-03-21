//required
const MONGOOSE = require('mongoose');

//MongoDB pages schema

var pageSchema = new MONGOOSE.Schema({
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

MONGOOSE.model('Page', pageSchema);
