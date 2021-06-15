var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model")
var szczepionka_types = require("../../../utils/types.json")

router.post('/', function(req, res, next) {
    console.log(req.body)
    if(!szczepionka_types.types.includes(req.body.type)) {
        console.log(req.body.type, req.body.pesel)
        res.status(401).json({
            "result": "Nie ma takiej szczepionki, dostępne: " + szczepionka_types.types
        })
    }
    if(!(req.body.password === process.env.ADMIN_PASS)) {
        res.status(401).json({
            "result": "Złe hasło."
        })
    }
    if((req.body.pesel==undefined) || (req.body.name==undefined) || (req.body.surname==undefined) || (req.body.birthDate==undefined) || (req.body.birthDate.length!=8)){
        res.status(401).json({
            "result": "Błąd we wprowadzonych danych."
        })
    }
    var birthdate=[];
    birthdate.push(req.body.birthDate.substring(0,4))
    birthdate.push(req.body.birthDate.substring(4,6))
    birthdate.push(req.body.birthDate.substring(6,8))
    var szczepionka = new szczepionka_model({
        type: req.body.type,
        pesel: req.body.pesel,
        name: req.body.name,
        surname: req.body.surname,
        birthDate: new Date(birthdate),
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