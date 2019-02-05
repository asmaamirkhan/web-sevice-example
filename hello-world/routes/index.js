var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.end(JSON.stringify({mesaj: "Selam dunya"}));
});

module.exports = router;
