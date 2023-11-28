var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("Acesse o link: http://localhost:3000/api-docs/");
});

module.exports = router;
