var express = require('express');
var router = express.Router();

/* GET products listing. */
router.get('/', function(req, res, next) {
    res.send('products');
});

module.exports = router;

