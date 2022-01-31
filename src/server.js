const http = require('http');
const { parse } = require('path');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET:
  {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/updateUser': jsonHandler.updateUser,
    notFound: jsonHandler.notFound,
  },
  HEAD:
  {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  console.dir(request.method);
  console.dir(parsedUrl);

  // Method 1
  /* const methodHandlers = urlStruct[request.method];
  if(!methodHandlers)
  {
    return urlStruct['GET'].notFound(request, response);
  }

  const handlerFunction = methodHandlers[parsedUrl.pathname];
  if(handlerFunction)
  {
    return urlStruct['GET'].notFound(request, response);
  }
  handlerFunction(request, response); */

  // Method 2
  if (urlStruct[request.method] && urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
