var express = require('express');
var router = express.Router();
var settings = require('/etc/datasources/apps-api.json');
var kurz = require('/usr/lib/kurz/socket_send.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/jabber', function(req, res) {
	console.log(req.body.message);
	if (req.body.token == settings.pisunBotToken) {
		kurz.socketSend("like-all@it-the-drote.tk", "chat", req.body.message, "/tmp/pisun.socket");
		res.send("OK\n");
	} else {
		res.send("Wrong token\n");
	}
});

module.exports = router;
