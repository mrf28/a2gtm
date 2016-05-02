var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = "/index.html";
  } else {
    filePath = request.url;
  }

  var absPath = __dirname  + filePath;
  //console.log(absPath);
  serverWorking(response, absPath);
});

// var io = require('socket.io').listen(server);
/*server.listen(4000, function(){
  console.log('Websockets listening on port 4000');
});*/

// io.set("origins", "*:*");

// io.on('connection', function(socket){
//   console.log('connected');

//   socket.on('joinBoard', function(boardId){
//     console.log('joined board: ' + boardId);
//     socket.join(boardId);
//   });

//   socket.on('addColumn', function (data){
//     console.log('column received', data);
//     socket.broadcast.to(data.boardId)
//       .emit("broadcast column",data.column);
//   })

//   socket.on('addCard', function (data){
//     socket.broadcast.to(data.boardId)
//       .emit("broadcast card",data.card);
//   })

//   socket.on('disconnect', function(){
//     console.log('disconnecting');
//   });
// });

var port_number = server.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});