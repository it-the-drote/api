var express = require('express');
var router = express.Router();
var settings = require('/etc/datasources/apps-api.json');
var fs = require('fs');
var kurz = require('/usr/lib/kurz/socket_send.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/jabber', function(req, res) {
	console.log(req.body.message);
	if (fs.existsSync('/tmp/pisun.socket')) {
		if (req.body.token == settings.pisunBotToken) {
			kurz.socketSend(req.body.recipient, "chat", req.body.message, "/tmp/pisun.socket");
			res.send("OK\n");
		} else {
			res.send("Wrong token\n");
		}
	} else {
		res.send("Pisun is dead\n");
	}
});

module.exports = router;
