var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.end(JSON.stringify({message: "Selam dunya"}));
});

module.exports = router;
