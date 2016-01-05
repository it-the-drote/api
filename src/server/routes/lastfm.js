var express = require('express');
var router = express.Router();
var fs = require('fs');
var mc = require('mc');
var format = require('string-template');
var https = require('https');
var http = require('http');

function makeHtmlContent(name, jscontent) {
	var template = fs.readFileSync('./public/js-templates/lastfm-api.js').toString();
	var info = JSON.parse(jscontent).recenttracks.track[0];
	var albumArt = info.image[3].#text;
	var trackUrl = info.url;
	var trackTitle = info.name;
	var trackArtist = info.artist.#text;
	var trackAlbum = info.album.#text
	innerHtml = {
		htmlcontent: '<div class="lastfm"><h3>Now playing: ' +
		name + '</h3></div><div class="lastfm"><img class="lastfm-pic" src="' +
		albumArt + '"></img></div><div class="alert alert-warning">' +
		'<a href="' + trackUrl + '">' + trackArtist + ' - ' + trackTitle + '</a></div>'
	};
	return(format(template, innerHtml));
}

router.get('/lastfm/nowplaying/:login', function(request, response) {
	var memcache = new mc.Client();
	memcache.connect(function() {
		memcache.get("lastfm-info-" + request.params.login,
			function(err, memcacheResponse) {
				if(err && err.type == 'NOT_FOUND') {
					https.get('https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + request.params.login + '&api_key=f4ba050b95c9cd5dad4f5187349fe89d&format=json&limit=1',
						function(res) {
							var jsonData = '';
							res.on('data', function(chunk){
								console.log("Chunk: " + chunk);
								jsonData += chunk;
							});
							res.on('end', function() {
								memcache.set("lastfm-info-" + request.params.login,
									jsonData,
									{flags: 0, exptime: 300},
									function(err, status) {
										console.log(status);
										console.log(err);
									});
								response.setHeader("Content-Type", "application/javascript");
								response.send(makeHtmlContent(request.params.login,
									jsonData));
							});
						});
				} else {
					response.setHeader("Content-Type", "application/javascript");
					response.send(makeHtmlContent(request.params.login,
						memcacheResponse['lastfm-info-' + request.params.login]));
				}
			});
	});
});

module.exports = router;
