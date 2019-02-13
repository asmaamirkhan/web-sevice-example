var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.end(JSON.stringify({mesaj: "Selam dunya"}));
});

router.post('/postMethod', function(req, res) {
  res.end(JSON.stringify(req.body));
  console.log(req.body);
});

router.get('/getMethod', function(req, res) {
  res.end(JSON.stringify({name: req.query.name, surname: req.query.surname}));
});

module.exports = router;
