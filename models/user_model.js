const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {required: true, type: String},
    password: {required: true, type: String},
    account_type: {required: true, type: String},
    pesel: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birthDate: {type: Date, required: true},
    vaccinated: {type: Boolean, required: true}
});

module.exports = mongoose.model('User', userSchema);