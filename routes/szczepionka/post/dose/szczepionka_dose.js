var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../../models/szczepionka_model")

router.post('/', function(req, res, next) {
    if(!(req.body.password === process.env.ADMIN_PASS)) {
        res.status(401).json({
            "result": "Złe hasło."
        })
    }
    szczepionka_model.findOne({_id: req.body.patientID}).exec().then(result => {
        result.secondDoseDate = new Date()
        result.didTakeAllDoses = true
        result.save(r => {
            res.status(200).json({
                "result": "Dodano drugą dawke szczepionki dla pacjenta " + result.name + " " + result.surname
            })
        }).catch(err => {

        })
    }).catch(err => {})
});

module.exports = router;