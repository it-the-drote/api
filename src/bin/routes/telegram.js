const fs = require('fs');
const util = require('util');
const querystring = require('querystring');
const leicht = require('/usr/lib/leicht/leicht.js');


var telegramToken = process.env['TELEGRAM_BOT_TOKEN'];
var recipient = parseInt(fs.readFileSync(process.env['TELEGRAM_BOT_RECIPIENT'], 'utf8').split('\n')[0]);

module.exports = (request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200);
    response.end("This endpoint does not support GET requests");
  } else if (request.method === 'POST') {
    var data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
    request.on('end', () => {
      //console.log("Message structure: " + util.inspect(data));
      fields = querystring.parse(data);
      if (fields.token === telegramToken) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Success');
      } else {
        response.writeHead(401, {'Content-Type': 'text/plain'});
        response.end('Unauthorized');
      }
    });
  }
};
