var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../models/szczepionka_model");
var ObjectId = require('mongoose').Types.ObjectId;
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
    let patientid = req.params["patientid"];
    let patientInfo = [];
    szczepionka_model.find({patientID: new ObjectId(patientid)}).exec().then(result => {
        patientInfo = JSON.stringify(result);
        generateQRCode(patientInfo);

        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
     })
});


module.exports = router;