var express = require('express');
var router = express.Router();
var Lastfm = require('simple-lastfm');
var settings = require('/etc/datasources/apps-api.json');

var lastfm = new Lastfm({
  api_key: settings.scrobbleApiKey,
  api_secret: settings.scrobbleApiSecret,
  username: settings.scrobbleUsername,
  password: settings.scrobblePassword,
});

router.post('/scrobble/report', function(req, res) {
  lastfm.getSessionKey(function(result) {
    console.log('Session key: ' + result.session_key);
    if (result.success) {
      console.log('Attempting to scrobble...');
      lastfm.scrobbleTrack({
        artist: req.query.artist,
        track: req.query.track,
        callback: function(result) {
          console.log('In callback, finished: ' + result);
          res.send("OK\n");
        }
      });
    }
  });
});

module.exports = router;
