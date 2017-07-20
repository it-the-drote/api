var express = require('express');
var router = express.Router();
var Lastfm = require('simple-lastfm');
var mc = require('mc');
var settings = require('/etc/datasources/apps-api.json');

var lastfm = new Lastfm({
  api_key: settings.scrobbleApiKey,
  api_secret: settings.scrobbleApiSecret,
  username: settings.scrobbleUsername,
  password: settings.scrobblePassword,
  debug: true
});

function scrobble(data, secret, res) {
  lastfm.scrobbleTrack({
    artist: data.artist,
    track: data.track,
    session_key: secret,
    callback: function(result) {
      console.log('In callback, finished: %j', result);
      res.send("OK\n");
    }
  });
}

router.post('/scrobble/report', function(req, res) {
  var data = {
    artist: req.body.artist,
    track: req.body.track
  };
  var memcache = new mc.Client();
  memcache.connect(function () {
      console.log('Connected to memcached');
      memcache.get('scrobbler-session-key', function(err, memcacheResponse) {
        if (err && err.type == 'NOT_FOUND') {
          lastfm.getSessionKey(function(result) {
            if (result.success) {
              memcache.set('scrobbler-session-key', result.session_key, {flags: 0, exptime: 604800}, function(err, status) {
                console.log('Scrobbler memcache status: ' + status);
                console.log('Scrobbler memcache error: ' + status);
              });
              scrobble(data, result.session_key,res);
            }
          });
        } else {
          console.log('Getting data from memcache');
          scrobble(data, memcacheResponse['scrobbler-session-key'], res);
        }
      });
  });
});

module.exports = router;
