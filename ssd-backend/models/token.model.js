var mongoose = require('mongoose');
const schema = mongoose.Schema;

const tokenScehema = new schema({
    token: {
        type: String,
        required: true
    },
})
module.exports = Token = mongoose.model('token', tokenScehema)