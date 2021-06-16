var express = require('express');
var router = express.Router();
var user_model = require("../../../models/user_model")
var jwt = require("jsonwebtoken")

router.post('/', function(req, res, next) {

    jwt.verify(req.body.token, process.env.JWT, (err, decoded) => {
        if(decoded.account_type == "admin") {
            user_model.count({_id: req.body.accountID}).exec().then(result => {
                if(result > 0) { // if user does exist then proceed forward
                    user_model.findOne({accountID: req.body.accountID}).exec().then(result => {
                        result.account_type = "doctor";
                        result.save(r => {
                            res.status(200).json({
                                "result": "Dodano drugą dawke szczepionki."
                            })
                        }).catch(err => {
                        })
                    }).catch(err => {
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