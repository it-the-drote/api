var fs = require('fs');
const util = require('util');
var telegramToken = process.env['TELEGRAM_BOT_TOKEN'];
var leicht = require('/usr/lib/leicht/leicht.js');
var recipient = parseInt(fs.readFileSync(process.env['TELEGRAM_BOT_RECIPIENT'], 'utf8').split('\n')[0]);

module.exports = (request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200);
    response.end("This endpoint does not support GET requests");
  } else if (request.method === 'POST') {
    console.log("Request structure: " + util.inspect(request));
    response.writeHead(200);
    response.end("OK");
  }
};
