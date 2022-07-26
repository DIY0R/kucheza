import net from 'net';

const arrSocket: Array<net.Socket> = [];
const chatHistory: string[] = [];
const onData = (data: string) => {
  chatHistory.push(data.toString());
  arrSocket.forEach((socket) => {
    socket.write(data);
  });
};

const server = net
  .createServer((socket) => {
    socket.setNoDelay(true);
    socket.write(chatHistory.toString());
    arrSocket.push(socket);

    socket.on('data', onData);

    socket.on('error', (error) => {
      console.log(error);
    });
  })
  .listen(
    {
      host: 'localhost',
      port: 2000,
    },
    () => console.log('\x1b[37m%s\x1b[0m', 'server start !')
  );
