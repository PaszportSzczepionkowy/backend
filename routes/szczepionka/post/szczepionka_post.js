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

    jwt.verify(req.body.token, process.env.JWT, (err, decoded) => {
        if(decoded.account_type !== "patient") {
            user_model.count({_id: req.body.accountID}).exec().then(result => {
                if(result > 0) { // if user does exist then proceed forward
                    var szczepionka = new szczepionka_model({
                        accountID: req.body.accountID,
                        type: req.body.type,
                        pesel: result.pesel,
                        name: result.name,
                        surname: result.surname,
                        birthDate: result.birthdate,
                        date: new Date() //creates date object with today's date, since the patient has just got vaccinated
                    })

                    szczepionka.save().then(result => {
                        res.status(200).json({
                            "result": "Dodano szczepionke dla pacjenta " + result.name + " " + result.surname
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