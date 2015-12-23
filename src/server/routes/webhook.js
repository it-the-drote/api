var express = require('express');
var router = express.Router();
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;
var settings = require('/etc/datasources/apps-api.json');

function puts(error, stdout, stderr) {
	sys.puts(stdout);
}

router.post('/webhook/mdblog', function(req, res) {
	try {
		if (fs.statSync('/home/apps/it-the-drote/markdown-content/')) {
			if (req.body.token == settings.webhookToken) {
				process.chdir('/home/apps/it-the-drote/markdown-content/');
				exec('git pull origin master', puts);
				res.send("OK\n");
			} else {
				res.send("Wrong token\n");
			}
		}
	} catch(err) {
		if(err.message.startsWith('ENOENT')) {
			try {
				process.chdir('/home/apps/it-the-drote/');
				exec('git clone https://github.com/Like-all/markdown-articles markdown-content', puts);
			} catch(e) {
				console.log("Unable to clone repository:" + e.message);
			}
		}
	}
});

module.exports = router;
