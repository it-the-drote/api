var express = require('express');
var router = express.Router();

router.get('/board/items/cpu', function(req, res) {
	var randnumber = Math.random() * (100 - 50) + 50;
	res.send('{ "cpu": ' + randnumber + ' }' );
});

module.exports = router;
