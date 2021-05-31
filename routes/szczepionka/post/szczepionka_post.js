var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model")
var szczepionka_types = require("../../../utils/types.json")

router.post('/', function(req, res, next) {
    if(!szczepionka_types.types.includes(req.body.type)) {
        res.status(401).json({
            "result": "Nie ma takiej szczepionki, dostępne: " + szczepionka_types.types
        })
    }
    if(!(req.body.password === process.env.ADMIN_PASS)) {
        res.status(401).json({
            "result": "Złe hasło."
        })
    }
    var szczepionka = new szczepionka_model({
        type: req.body.type,
        pesel: req.body.pesel,
        name: req.body.name,
        surname: req.body.surname,
        date: new Date() //creates date object with today's date, since the patient has just got vaccinated
    })
    console.log(szczepionka)
    szczepionka.save().then(result => {
        return res.status(200).json({
            "result": "Dodano szczepionke dla pacjenta " + req.body.name + " " + req.body.surname
        })
    }).catch(err => {

    })
});

module.exports = router;