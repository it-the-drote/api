var express = require('express');
var router = express.Router();
var fs = require('fs');
var format = require('string-template');
var https = require('https');

function makeHtmlContent(name, jscontent) {
	var template = fs.readFileSync('./public/js-templates/instagram-api.js').toString();
	var picture = JSON.parse(jscontent).display_src;
	innerHtml = {
		htmlcontent: '<div class="instagram"><a href="https://www.instagram.com/' + name +
		'"><h3>Instagram</h3></a></div><div class="instagram"><img class="instagram-pic" src="' +
		picture + '"></img></div>'
	};
	return(format(template, innerHtml));
}

router.get('/widgets/github/contributions/', function(request, response) {
    response.send('Foo');
});

module.exports = router;
