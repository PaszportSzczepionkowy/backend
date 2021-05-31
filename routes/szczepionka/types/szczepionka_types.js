var express = require('express');
var router = express.Router();
var szczepionka_types = require("../../../utils/types.json")

router.get('/', function(req, res, next) {
    res.status(200).json(szczepionka_types.types)
});

module.exports = router;