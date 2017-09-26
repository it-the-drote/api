var express = require('express');
var router = express.Router();
var fs = require('fs');
var settings = require('/etc/datasources/apps-api.json');

router.post('/device-ping/:device_uuid',function(req, res) {
  console.log(req.params.device_uuid);
  res.send("OK\n");
});

module.exports = router;
