var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model");
var ObjectId = require('mongoose').Types.ObjectId;
var user_model = require("../../../models/user_model")
var QRCode = require('qrcode');

const generateQRCode = async info => {
    QRCode.toFile('public/qr.png', info, {
        color: {
            dark: '000000', //qr color
            light: '#ffffff' //background color
        }
    }, function (err) {
        if (err) throw err
    })
}

router.get('/:patientid', function(req, res, next) {
    try{
        let patientid = new ObjectId(req.params["patientid"]);
        console.log(patientid)
        user_model.find({_id: patientid}).exec().then(result => {
            patientInfo = JSON.stringify(result);
            generateQRCode(req.params["patientid"]);

            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
        })
    }catch(err){
        console.log(err)
        res.json({"result": "Brak danych"})
    }


});


module.exports = router;