var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model");
var user_model = require("../../../models/user_model");
var jwt = require("jsonwebtoken");
var mongoose = require('mongoose');

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

router.get('/:id', function(req, res, next) {
    let id = req.params["id"];
    try{
        let idObj =  mongoose.Types.ObjectId(id);
        szczepionka_model.find({accountID: idObj}).exec().then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err);
        })

    }catch(err){
        res.json({"result": "Brak danych"})
    }
});


module.exports = router;