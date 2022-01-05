import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  path: '/',
  serveClient: false,
});


io.on('connection', (socket) => {

  // Client
  // var socket = io.connect();
  // socket.emit('join', 'room1');
  socket.on('join', (room) => {
    socket.join(room);
  });

  // Client
  // socket.on('broadcast', (payload) => {
  //   console.log('socket', 'broadcast', payload)
  // });

  // const payload = {foo: 'bar'}
  // setTimeout(() => {
  //   socketTwo.emit('broadcast', 'monitor', payload);
  // }, 1000)
  socket.on('broadcast', (room, payload) => {
    socket.to(room).emit('broadcast', payload);
  });
});

httpServer.listen(8080);