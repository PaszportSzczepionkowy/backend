var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model")
var user_model = require("../../../models/user_model")
var szczepionka_types = require("../../../utils/types.json")
var jwt = require("jsonwebtoken")

router.post('/', function(req, res, next) {

    if(!szczepionka_types.types.includes(req.body.type)) {
        return res.status(401).json({
            "result": "Nie ma takiej szczepionki, dostępne: " + szczepionka_types.types
        })
    }

    if((req.body.pesel === undefined) || (req.body.name === undefined) || (req.body.surname === undefined) || (req.body.birthDate === undefined) || (req.body.birthDate.length !== 8)){
        return res.status(401).json({
            "result": "Błąd we wprowadzonych danych."
        })
    }

    jwt.verify(req.body.token, process.env.JWT, (err, decoded) => {
        if(decoded.account_type !== "patient") {
            user_model.count({_id: req.body.accountID}).exec().then(result => {
                if(result > 0) {
                    var szczepionka = new szczepionka_model({
                        accountID: req.body.accountID,
                        type: req.body.type,
                        pesel: req.body.pesel,
                        name: req.body.name,
                        surname: req.body.surname,
                        birthDate: new Date().setFullYear(req.body.birthDate.substring(0, 4), req.body.birthDate.substring(4, 6), req.body.birthDate.substring(6, 8)),
                        date: new Date() //creates date object with today's date, since the patient has just got vaccinated
                    })

                    szczepionka.save().then(result => {
                        res.status(200).json({
                            "result": "Dodano szczepionke dla pacjenta " + req.body.name + " " + req.body.surname
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }else {
                    res.status(200).json({
                        "result": "Nie ma takiego użytkownika!"
                    })
                }
            })
        }else {
            res.status(401).json({
                "result": "Brak uprawnień."
            })
        }
    })

});

module.exports = router;