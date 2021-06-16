var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../../models/szczepionka_model")
var jwt = require("jsonwebtoken")

router.post('/', function(req, res, next) {
    jwt.verify(req.body.token, process.env.JWT, (err, decoded) => {
        if(decoded.account_type !== "patient") {
            szczepionka_model.findOne({accountID: req.body.patientID}).exec().then(result => {
                result.secondDoseDate = new Date()
                result.didTakeAllDoses = true
                result.save(r => {
                    res.status(200).json({
                        "result": "Dodano drugą dawke szczepionki."
                    })
                }).catch(err => {
                })
            }).catch(err => {
            })
        }
    })
});

module.exports = router;