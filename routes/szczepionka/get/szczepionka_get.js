var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model")

router.get('/', function(req, res, next) {
    if(!(req.body.password === process.env.ADMIN_PASS)) {
        res.status(401).json({
            "result": "Złe hasło."
        })
    }
    szczepionka_model.find({}).exec().then(result => {
        res.status(200).json(result)
    }).catch(err => {

    })
});

module.exports = router;