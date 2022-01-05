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
  // socket = io(WEBSOCKET_SERVER_URL);
  // socket.on('connect', () => {
  //   socket.emit('join', 'monitor');
  // })

  // socket.on('monitor:nvidia:changed', (payload) => {
  //   console.log('monitor:nvidia:changed', payload)
  // });

  // const payload = { previous: {...}, current: {...}}
  // setTimeout(() => {
  //   socketTwo.emit('monitor:nvidia:changed', payload);
  // }, 1000)
  socket.onAny((rawEvent, payload) => {

    const [room, ...roomEventNamespace] = rawEvent.split(':')
    if (roomEventNamespace.length === 0 || !socket.rooms.has(room)) return

    socket.to(room).emit(rawEvent, payload);
  });
});

httpServer.listen(8080);