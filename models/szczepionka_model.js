const mongoose = require('mongoose');

const szczepionkaSchema = mongoose.Schema({
    type: {type: String, required: true},
    pesel: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    date: {type: Date, required: false},
    didTakeSecondDose: {type: Boolean, required: false},
    secondDoseDate: {type: Date, required: false},
    didTakeAllDoses: {type: Boolean, required: false}
});

module.exports = mongoose.model('Szczepionka', szczepionkaSchema);