var express = require('express');
var router = express.Router();
var fs = require('fs');
var settings = require('/etc/datasources/apps-api.json');
var leicht = require('/usr/lib/leicht/leicht.js');
var environment = parseString(fs.readFileSync('/etc/apps/environment.type', 'utf8').split('\n')[0]);
var recipient = parseInt(fs.readFileSync('/etc/datasources/pisun-default-chat.' + environment, 'utf8').split('\n')[0]);
var socket = '/var/run/apps/pisun.socket';

router.post('/telegram', function(req, res) {
	console.log(req.body.message);
	if (fs.existsSync(socket)) {
		if (req.body.token == settings.pisunBotToken) {
			leicht.sendMessage(recipient, 0, req.body.message, false, socket);
			res.send("OK\n");
		} else {
			res.send("Wrong token\n");
		}
	} else {
		res.send("Pisun is dead\n");
	}
});

module.exports = router;
