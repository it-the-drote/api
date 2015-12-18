var express = require('express');
var router = express.Router();
var settings = require('/etc/datasources/apps-api.json');
var fs = require('fs');
var mc = require('mc');
var format = require('string-template');
var https = require('https');
var http = require('http');
var kurz = require('/usr/lib/leicht/leicht.js');

function makeHtmlContent(name, jscontent) {
	var template = fs.readFileSync('./public/js-templates/duolingo-api.js').toString()
	var langs
	var data = JSON.parse(jscontent)
	for(var i = 0; i < data.length; i++) {
		langs += '<div class="duolingo"><img src="http://api.it-the-drote.tk/static/img/countryballs/' +
		data[i].language +
		'.png"></img><div class="duolingo-counter">Level ' +
		data[i].level + '</div>'
		console.log("Langs: " + langs)
	}
	innerHtml = {
		htmlcontent: '<div class="duolingo"><h1>Duolingo: ' +
		name + '</h1></div>' +
		langs
	}
	return(format(template, innerHtml))
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/duolingo/badges/:login', function(req,resp){
	var memcache = new mc.Client();
	memcache.connect(function() {
		console.log("Connected to memcached");
		userInfo = '';
		
		memcache.get("duolingo-info-" + req.params.login, function(err, memcacheResponse) {
			if(err && err.type == 'NOT_FOUND') {
				http.get('http://www.duolingo.com/users/' + req.params.login, function(res) {
					res.setEncoding('utf8');
					res.on('data', function(chunk) {
						userInfo += chunk;
					});
					res.on('end', function() {
						memcache.set("duolingo-info-" + req.params.login, JSON.stringify(JSON.parse(userInfo).languages), {flags: 0, exptime: 10800}, function(err, status) {
							console.log(status);
							console.log(err);
						});
						console.log('data is taken from the web')
						resp.setHeader("Content-Type", "application/javascript");
						resp.send(makeHtmlContent(req.params.login, JSON.stringify(JSON.parse(userInfo).languages)));
					});
				});
			} else {
				resp.setHeader("Content-Type", "application/javascript");
				resp.send(makeHtmlContent(req.params.login, memcacheResponse['duolingo-info-' + req.params.login]));
				console.log('data is taken from the memcache');
			}
		});
	});
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
