var express = require('express');
var router = express.Router();
var szczepionka_model = require("../../../models/szczepionka_model");
var user_model = require("../../../models/user_model");
var ObjectId = require('mongoose').Types.ObjectId;
var QRCode = require('qrcode');
var fs = require("fs");
var path = require("path");
var jwt = require("jsonwebtoken")

router.get('/', function(req, res, next) {
    jwt.verify(req.body.token, process.env.JWT, (err, decoded) => {
        if(err) return res.status(401).json({"result": "Zły token!"})
        if((decoded.accountID === req.body.patientID)) { // if user's token is good
            var finalobj;
            szczepionka_model.count({accountID: req.body.patientID}).exec().then(count => {
                if(count > 0) { // has been vaccinated
                    szczepionka_model.find({accountID: req.body.patientID}).exec().then(vaccine => {
                        user_model.find({_id: req.body.patientID}).exec().then(user => {
                            finalobj = {vaccine, user};
                            QRCode.toDataURL(JSON.stringify(finalobj), function (err, code) {
                                if(err) return console.log("error occurred")
                                const img = Buffer.from(code.split(",")[1], 'base64');
                                res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': img.length});
                                res.end(img); //send qr
                            })
                        })
                    })

                }else { // hasn't been vaccinated
                    user_model.find({_id: req.body.patientID}).exec().then(user => {
                        QRCode.toDataURL(JSON.stringify(user), function (err, code) {
                            if(err) return console.log("error occurred")
                            const img = Buffer.from(code.split(",")[1], 'base64');
                            res.writeHead(200, {'Content-Type': 'image/png', 'Content-Length': img.length});
                            res.end(img); //send qr
                        })
                    })
                }
            }).catch(err => {
                console.log(err);
            })
        }else {
            return res.status(401).json({"result": "Zły token!"})
        }
    })
});


module.exports = router;