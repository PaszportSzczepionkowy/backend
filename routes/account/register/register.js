var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require("bcrypt");
var user_model = require("../../../models/user_model");
require('dotenv').config()

router.post('', ((req, res, next) => {
    if((req.body.pesel === undefined) || (req.body.name === undefined) || (req.body.surname === undefined) || (req.body.birthDate === undefined) || (req.body.birthDate.length !== 8)){
        return res.status(401).json({
            "result": "Błąd we wprowadzonych danych."
        })
    }

    user_model.find({email: req.body.email}).exec().then(result => {
        if(result.length >= 1) { // check if user exists
            return res.status(409).json({"result": "Użytkownik z takim emailem już istnieje!"})
        }else { // if user doesnt exist
            bcrypt.hash(req.body.password, 10, (err, hash) => { // hash password
                if(err) {
                    return res.status(500).json({"result": "cos poszlo nie tak :("})
                }else {
                    if(req.body.birthDate !== undefined) {
                        var user = new user_model({
                            email: req.body.email,
                            name: req.body.name,
                            surname: req.body.surname,
                            pesel: req.body.pesel,
                            password: hash,
                            account_type: "patient",
                            birthDate: new Date().setFullYear(req.body.birthDate.substring(0, 4), req.body.birthDate.substring(4, 6), req.body.birthDate.substring(6, 8))
                        })
                        user.save().then(result => { // save user to db
                            return res.status(200).json({"result": "Zarejestrowano użytkownika!"})
                        })
                    }
                }
            })
        }
    })
}))

module.exports = router;