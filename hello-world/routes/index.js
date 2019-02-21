var express = require("express");
var mysql = require("mysql");
const rp = require("request-promise");
var router = express.Router();

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Successfully connected to DB!");
});

router.get("/", function(req, res) {
  res.end(JSON.stringify({ mesaj: "Selam dunya" }));
});

router.post("/postMethod", function(req, res) {
  res.end(JSON.stringify(req.body));
});

router.get("/getMethod", function(req, res) {
  res.end(JSON.stringify({ name: req.query.name, surname: req.query.surname }));
});

router.get("/bookList", function(req, res) {
  var sql = "select * from book_info";
  conn.query(sql, function(err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result));
  });
});

router.post("/login", function(req, res) {
  var sql = "select * from users where email = ? and password = ?;";
  conn.query(sql, [req.body.email, req.body.password], function(err, result) {
    if (err) throw err;
    if (result.length)
      res.end(JSON.stringify({ mesaj: "Hoş geldiniz", giris: true }));
    else res.end(JSON.stringify({ mesaj: "Deneme başarısız", giris: false }));
  });
});


const url = "http://www.floatrates.com/daily/try.json";

router.get("/getTRY", function(req, res) {
  rp(url)
    .then(function(data) {
      //let dd = JSON.parse(data).usd.inverseRate;
      res.end(
        JSON.stringify({
          dolar: JSON.parse(data).usd.inverseRate,
          euro: JSON.parse(data).eur.inverseRate,
          suriye_lirası: JSON.parse(data).syp.inverseRate,
          urdun_dinari: JSON.parse(data).jod.inverseRate
        })
      );
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
