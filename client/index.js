const net = require('net');

const socket = new net.Socket();

socket.on('data', (data) => {
  console.log('server->' + data.toString().split(','));
});

socket.connect(
  {
    port: 2000,
    host: 'localhost',
  },
  () => {
    socket.write(Math.random().toString());
  }
);

socket.on('error', () => console.log('error'));

process.on('SIGINT', () => {
  socket.end();
  process.exit(1);
});
