var express, path, app, http, io;

express = require('express');
path = require('path');
app = express();
http = require('http').Server(app);
io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(request, respone) {
	respone.sendfile('view/index.html');
});

app.get('/template/comment.html', function(request, respone) {
	respone.sendfile('view/comment.html');
});

io.on('connection', function(socket) {
	console.log('A user connected');

	socket.on('broadcast', function(user, message) {
		io.emit('broadcast', user, message);
		console.log('From: ' + user + ' Message: ' + message);
	});
});

http.listen(3000);