var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Dropped.', subtitle: 'People drop things. Phones are one of them.' });
});

router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' })
});

module.exports = router;
