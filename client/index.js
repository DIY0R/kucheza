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
    console.log('\x1b[46m%s\x1b[0m', 'LOG', 'Сlient connect to server 🔛');
    socket.write(Math.random().toString());
  }
);

socket.on('error', (error) =>
  console.log('\x1b[41m%s\x1b[0m', 'ERROR', { ...error })
);

process.on('SIGINT', () => {
  socket.end();
  process.exit(1);
});
