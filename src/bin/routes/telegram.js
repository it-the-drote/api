var utils = ('../utilities');
/*
var actions = {
  'GET': (request, response) => {
    utils.sendResponse(response, 'Hello World', 200, {'Content-Type': 'text/plain'});
  },
  'POST': (request, response) => {
    utils.collectData(request, (formattedData) => {
      // do something with the formatted data e.g. store in db
      utils.sendResponse(response, 'Success', 200, {'Content-Type': 'text/plain'});
    });
  }
};
*/
module.exports = (request, response) => {
  //var action = actions[request.method];
  //if (action) {
  //  action(request, response);
  //} else {
    utils.sendResponse(response, "API telegram page mock", 200);
  //}
};
