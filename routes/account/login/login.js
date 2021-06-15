var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require("bcrypt");
var user_model = require("../../../models/user_model");
var jwt = require("jsonwebtoken");

router.post('', ((req, res, next) => {
    user_model.find({email: req.body.email}).exec().then(result => {
        if(!(result.length >= 1)) {
            return res.status(409).json({"result": "Nie ma takiego użytkownika."})
        }
        bcrypt.compare(req.body.password, result[0].password, (err, status) => {
            if(status) {
                jwt.sign({
                    email: result[0].email,
                    account_type: result[0].account_type
                }, process.env.JWT, {expiresIn: "7d"}, (err, token) => {
                    console.log(token)
                    res.status(200).json({"token": token})
                })
            }else {
                res.status(409).json({"result": "Złe hasło/email!"})
            }
        })
    }).catch(err => {})
}))

module.exports = router;