const mongoose = require('mongoose');

const szczepionkaSchema = mongoose.Schema({
    accountID: {type: mongoose.Types.ObjectId, required: false},
    type: {type: String, required: true},
    pesel: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birthDate: {type: Date, required: true},
    date: {type: Date, required: false},
    secondDoseDate: {type: Date, required: false},
    didTakeAllDoses: {type: Boolean, required: false}
});

module.exports = mongoose.model('Szczepionka', szczepionkaSchema);