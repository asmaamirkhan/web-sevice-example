var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
});

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

router.get('/bookList', function(req, res) {
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to DB!");
    var sql = "select * from book_info";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      res.end(JSON.stringify(result));
    });
  });
  
});

module.exports = router;
