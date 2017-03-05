// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		///MY SOCKET EVENTS HERE


			//==========Chat MESSAGE=======//

		socket.on('chatmessage_m', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);
			
			// Sends the message to everyone EXCEPT the client it came from
			//socket.broadcast.emit('chatmessage', data);


			/* Sends the message to everyone INCLUDING THE CLIENT IT CAME FROM*/
			io.sockets.emit('chatmessage_m', data);
		});

		socket.on('chatmessage_e', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);
			
			// Sends the message to everyone EXCEPT the client it came from
			//socket.broadcast.emit('chatmessage', data);


			/* Sends the message to everyone INCLUDING THE CLIENT IT CAME FROM*/
			io.sockets.emit('chatmessage_e', data);
		});





		//=======Date Emit===========//

		socket.on('chatmessage_e', function (){

			console.log('got date');

			//emit event out to the output-clients (input client doesnt matter so thats why we use broadcast emit)

			io.sockets.emit('getDate');

		});


		socket.on('chatmessage_m', function (){

			console.log('got date');

			//emit event out to the output-clients (input client doesnt matter so thats why we use broadcast emit)

			io.sockets.emit('getDate');

		});


		










		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);