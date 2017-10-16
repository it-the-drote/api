var express = require('express');
var router = express.Router();
var fs = require('fs');
var settings = require('/etc/datasources/apps-api.json');

router.post('/device-ping/:device_uuid', async (req, res) => {
  console.log(req.params.device_uuid);
  var stats = await fs.stat('/tmp/' + req.params.device_uuid);
  console.log(stats);
  res.send("OK\n");
});

module.exports = router;
